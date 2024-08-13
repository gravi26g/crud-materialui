import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

export const routes: Routes = [
    {
        path:'/',component:AppComponent,
    
    },
    {
        path:"addeditemp",component:EmpAddEditComponent
    }
];
