import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetDataComponent } from './get-data/get-data.component';
import { SenDataComponent } from './sen-data/sen-data.component';

const routes: Routes = [
  {
    path: 'get',
    component: GetDataComponent,
  },
  { path: '',
    redirectTo: '/get',
    pathMatch: 'full'
  },
  {
    path: 'set',
    component: SenDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
