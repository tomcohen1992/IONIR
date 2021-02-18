import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeteorsComponent } from './meteors/meteors.component';


const routes: Routes = [
  {
    path: '',
    component: MeteorsComponent,
    data: { title: 'sort' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
