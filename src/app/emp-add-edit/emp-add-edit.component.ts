// import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';
// import {MatDialog, MatDialogModule} from '@angular/material/dialog';



@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule,MatRadioModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,FormsModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpAddEditComponent implements OnInit{
    education:string[]=[
      'Matric',
      'Diploma',
      'Intermediate',
      'Graduate',
      'Post Graduate'
    ]
    empForm:FormGroup
  // router=inject(Router)
    constructor(private fb:FormBuilder,
                private service:EmployeeService,
                public dialogRef: MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
                private coreservice:CoreService
    ){
      this.empForm=this.fb.group({
        firstname:'',
        lastname:'',
        email:'',
        dob:'',
        gender:'',
        education:'',
        company:'',
        experience:'',
        package:''
      })
    }
    ngOnInit(): void {
       this.empForm.patchValue(this.data)
    }
    onformsubmit(){
      if(this.empForm.valid){
        if(this.data){
          this.service.updateEmployee(this.data.id ,this.empForm.value).subscribe({
            next:(val:any)=>{
              
              alert('employee details sucessfully')
              
              this.dialogRef.close(true)
              this.ngOnInit()
              window.location.reload()
              // this.router.navigateByUrl('/')
             
            
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }else{
          this.service.addEmployee(this.empForm.value).subscribe({
            next:(val:any)=>{
              // alert('employee added sucessfully')
              this.coreservice.openSnackBar('employee added sucessfully','done')
              this.dialogRef.close(true)
  
              this.ngOnInit()
              window.location.reload()
             
            
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }
        
      }
    }

}
