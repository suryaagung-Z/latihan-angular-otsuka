import { Component, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/shared/service/app.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: false
})
export class TodoListComponent {
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;
  todoFormAdd: UntypedFormGroup;
  todoFormEdit: UntypedFormGroup;
  todoList: any;
  environment = environment;

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    protected service: AppService
  ) {
    this.todoFormAdd = this.fb.group({
      user_id: [null, Validators.required],
      category_id: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      due_date: ['', Validators.required],
      // file: [null]
    });

    this.todoFormEdit = this.fb.group({
      id: [null, Validators.required],
      user_id: [null, Validators.required],
      category_id: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      due_date: ['', Validators.required],
      // file: [null]
    });
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  addModalOpen(){
    this.todoFormAdd.patchValue({
      user_id: 1,
      category_id: 2
    });

    this.modalService.open(this.addModal);
  }

  editModalOpen(item: any) {
    console.log(item);
    this.todoFormEdit.patchValue({
      id: item.id,
      user_id: item.user_id,
      category_id: item.category_id,
      title: item.title ?? '',
      description: item.description ?? '',
      status: item.status ?? '',
      priority: item.priority ?? '',
      due_date: item.due_date ? item.due_date.split('T')[0] : '',
      // file: item.file
    });
    this.modalService.open(this.editModal);
  }
  
  onEdit(): void {
    if(this.todoFormEdit.invalid) return;

    this.service.put(`/todos/${this.todoFormEdit.value.id}`, this.todoFormEdit.value)
    .subscribe((res) => {
      if(res.status){
        Swal.fire('Sukses', 'Todo berhasil diperbarui', 'success');
        this.modalClose();
        this.ngOnInit();
      }else{
        Swal.fire('Error', 'Gagal memperbarui todo', 'error');
      }
    });
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan bisa mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(`/todos/${id}`)
      .subscribe((res) => {
        if(res.status === 'success'){
        Swal.fire('Terhapus!', 'Todo telah dihapus.', 'success');
        this.getTodoList();
        }else{
        Swal.fire('Error', 'Gagal menghapus todo', 'error');
        }
      });
      }
    });
  }

  modalClose(){
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if(this.todoFormAdd.invalid) return;

    this.service.post('/todos', this.todoFormAdd.value)
    .subscribe((res) => {
      if(res.status){
        Swal.fire('Success', 'Todo added successfully', 'success');
        this.modalClose();
        this.ngOnInit();
      }else{
        Swal.fire('Error', 'Failed to add todo', 'error');
      }
    });
  }

  getTodoList(): void { 
    this.service.get('/todos').subscribe((res) => {
      this.todoList = res.data;
      // console.log(this.service);
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      // console.log(input.files[0]);
      this.todoFormAdd.patchValue({
        file: input.files[0]
      });
    }
  }
}
