import { Component } from '@angular/core';
import { TEXTS } from '@core/constants';

@Component({
  selector: 'dialog-snackbar',
  templateUrl: './dialog-snackbar.component.html',
  styleUrls: ['./dialog-snackbar.component.css'],
  standalone: false
})
export class DialogSnackbarComponent {
  message: string = '';
  type: 'success' | 'error' | 'info' | 'confirm' = 'info';
  isVisible: boolean = false;
  texts = TEXTS.dialogSnackbar;
  invertButtonColors: boolean = false;


  private autoHideTimeout: number | undefined;
  confirmCallback: ((result: boolean) => void) | null = null;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.setupDialog(message, type);
    this.setupAutoHide();
  }

  showConfirm(message: string, callback: (result: boolean) => void, invertButtons: boolean = false) {
    this.setupDialog(message, 'confirm');
    this.confirmCallback = callback;
    this.invertButtonColors = invertButtons;
  }

  handleResponse(result: boolean) {
    this.hide();
    this.executeCallback(result);
  }

  private setupDialog(message: string, type: 'success' | 'error' | 'info' | 'confirm') {
    this.message = message;
    this.type = type;
    this.isVisible = true;
  }

  private setupAutoHide() {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }

    this.autoHideTimeout = window.setTimeout(() => {
      if (this.type !== 'confirm') {
        this.hide();
      }
    }, 3000);
  }

  private hide() {
    this.isVisible = false;
  }

  private executeCallback(result: boolean) {
    if (this.confirmCallback) {
      this.confirmCallback(result);
      this.confirmCallback = null;
    }
  }
}