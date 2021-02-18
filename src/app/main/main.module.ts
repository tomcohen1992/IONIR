import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TableComponent } from './shared/components/table/table.component';
import { TableService } from './shared/services/table.service';
import { ApiService } from './shared/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppOnlyDigitsDirective } from './shared/directives/numbersOnly.directive';
import { FiltersComponent } from './meteors/components/filters/filters.component';
import { MeteorsComponent } from './meteors/meteors.component';

@NgModule({
  declarations: [
    MeteorsComponent,
    TableComponent,
    FiltersComponent,
    AppOnlyDigitsDirective,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    TableService,
    ApiService
  ]
})
export class MainModule { }
