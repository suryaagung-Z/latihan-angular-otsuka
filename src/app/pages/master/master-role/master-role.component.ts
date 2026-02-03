import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-master-role',
  templateUrl: './master-role.component.html',
  styleUrl: './master-role.component.scss'
})
export class MasterRoleComponent {

  roleForm: UntypedFormGroup;

  constructor(private fb: FormBuilder, private service: AppService) {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(3)]],
      roleDescription: ['', [Validators.required, Validators.minLength(10)]]
    }); 
  }

  ngOnInit(): void {  

  }

  onSubmit(): void {
    console.log('Submitting Role Form');
    if (this.roleForm.valid) {
      const roleData = this.roleForm.value;
      console.log('Role Data Submitted:', roleData);
      
    }
  }

  onEdit(): void {

  }

  onDelete(): void {

  }

}
