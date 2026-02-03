import { Component, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/shared/service/app.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-department',
  templateUrl: './master-department.component.html',
  styleUrl: './master-department.component.scss'
})
export class MasterDepartmentComponent {
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;
  departmentFormAdd: UntypedFormGroup;
  departmentFormEdit: UntypedFormGroup;
  dataDepartment: any;

  constructor(private fb: FormBuilder, 
    private service: AppService, 
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    this.departmentFormAdd = this.fb.group({
      department_name: ['', Validators.required],
      department_code: ['', Validators.required]
    });

    this.departmentFormEdit = this.fb.group({
      department_name: ['', Validators.required],
      department_code: ['', Validators.required],
      id: [null]
    });
  }

  ngOnInit(): void { 
    this.service.get('/departments').subscribe((res) => {
      this.dataDepartment = res.data;
      console.log(this.dataDepartment);
    });
  }

  addModalOpen(){
    this.modalService.open(this.addModal);
  }

  editModalOpen(item: any){
    this.departmentFormEdit.patchValue({
      department_name: item.department_name,
      department_code: item.department_code,
      id: item.id
    })
    this.modalService.open(this.editModal);
  }

  modalClose(){
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if(this.departmentFormAdd.valid){
      this.service.post('/departments', this.departmentFormAdd.value)
      .subscribe((res) => {
        if(res.status === 'success'){
          Swal.fire('Success', 'Department added successfully', 'success');
          this.modalClose();
          this.ngOnInit();
        }else{
          Swal.fire('Error', 'Failed to add department', 'error');
        }
      });
    }
  }

  onEdit(): void {
    const editData = this.departmentFormEdit.value;
    if(this.departmentFormEdit.valid) {
      this.service.put(`/departments/${editData.id}`, editData)
    .subscribe((res) => {
      if(res.status === 'success'){
        Swal.fire('Success', 'Department updated successfully', 'success');
        this.modalClose();
        this.ngOnInit();
      }else{
        Swal.fire('Error', 'Failed to update department', 'error');
      }
    });
    }
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.put(`/departments/${id}`, '')
        .subscribe((res) => {
          if(res.status === 'success'){
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            this.ngOnInit();
          }else{
            Swal.fire('Error', 'Failed to delete department', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your department is safe :)', 'error');
      }
    });
  }

  onDetail(): void {}
}
