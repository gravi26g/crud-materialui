import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

// import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Employee } from './model/model';
import { DataSource } from '@angular/cdk/collections';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule,
    MatPaginator, MatPaginatorModule, MatSort, MatSortModule,
    MatTableModule, MatInputModule, MatFormFieldModule, DatePipe, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ["id", "firstname", "lastname", "email", "dob", "gender", "education", "company", "experience", "package", "actions"];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'crud';
  dialog = inject(MatDialog) 
  service = inject(EmployeeService)
  employeeobj: any;
  id: any;
  
  constructor( ) {

  }
  ngOnInit(): void {
    this.getemployee()
    this.deleteEmployee(this.id)
  }
  openaddEditEmployeeForm() {
    this.dialog.open(EmpAddEditComponent)
    this.dialog.afterAllClosed
    this.getemployee()
  }
  // applyFilter(data:any){}
  getemployee() {
    this.service.getEmployee().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator

      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: any) {
    this.service.deleteEmployee(id).subscribe((res: any) => {
      alert('employee deleted successfully')
      this.getemployee()
    })
  }
  openeditForm(data:any){
    this.dialog.open(EmpAddEditComponent,{data})
  }
}


