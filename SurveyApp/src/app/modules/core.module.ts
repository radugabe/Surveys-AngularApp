import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { DialogService } from '../core/services/dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    DialogService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('error');
    }
  }
}