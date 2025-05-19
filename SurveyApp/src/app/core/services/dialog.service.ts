import { Injectable } from '@angular/core';
import { DialogSnackbarComponent } from '../../components/dialog-snackbar/dialog-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSnackbar: DialogSnackbarComponent | null = null;

  register(snackbar: DialogSnackbarComponent) {
    this.dialogSnackbar = snackbar;
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.dialogSnackbar?.show(message, type);
  }

  confirm(message: string, invertButtons: boolean = false): Promise<boolean> {
    return new Promise(resolve => {
      this.dialogSnackbar?.showConfirm(message, resolve, invertButtons);
    });
  }
}
