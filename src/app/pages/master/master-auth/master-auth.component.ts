import { 
  Component, 
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { AppService } from 'src/app/shared/service/app.service';
import { DataApi } from 'src/app/core/interface/dataApi';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-master-auth',
  templateUrl: './master-auth.component.html',
  styleUrl: './master-auth.component.scss'
})

export class MasterAuthComponent implements OnInit {
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;

  dataList: DataApi[] = [];
  addForm!: UntypedFormGroup;
  editForm!: UntypedFormGroup;

  constructor(
    private restApi: AppService, 
    private NgbModal: NgbModal, 
    private NgbActiveModal: NgbActiveModal, 
    private fb: FormBuilder) 
    {
    this.addForm = this.fb.group({
      category: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      category: ['', Validators.required],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    this.restApi.get('https://jsonplaceholder.typicode.com/posts')
    .subscribe((res: any)=>{
      this.dataList = res.data;
      console.log(this.dataList);
    });
  }

  onSubmit(){
    this.restApi.post('https://jsonplaceholder.typicode.com/posts', this.addForm.value)
    .subscribe((res: any)=>{
      console.log('Data added successfully', res);
      this.NgbModal.dismissAll();
      this.loadData();
    });
  }



  onEdit(){
    this.restApi.put('https://jsonplaceholder.typicode.com/posts/' + this.editForm.value.id, this.editForm.value)
    .subscribe((res: any)=>{
      console.log('Data updated successfully', res);
      this.NgbModal.dismissAll();
      this.loadData();
    });
  }

  onDelete(id: number){
    this.restApi.delete(`https://jsonplaceholder.typicode.com/posts/` + id)
    .subscribe((res: any)=>{
      console.log('Data deleted successfully', res);
      this.loadData();
    });
  }

  onAddModalOpen(){
    this.NgbModal.open(this.addModal, { size: 'lg', centered: true });
  }

  onEditModalOpen(item: any){
    this.editForm.patchValue({
      category: item.category,
      id: item.id
    });
    this.NgbModal.open(this.editModal, { size: 'lg', centered: true });
  }

  


}

//Search
//Pagination
//Sort
//Charts