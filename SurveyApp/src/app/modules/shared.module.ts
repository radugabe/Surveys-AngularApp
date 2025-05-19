import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material-module';

import { HeaderComponent } from '../components/header/header.component';
import { DialogSnackbarComponent } from '../components/dialog-snackbar/dialog-snackbar.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DialogSnackbarComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    DialogSnackbarComponent
  ]
})
export class SharedModule { }