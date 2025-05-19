import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';
import { TEXTS, MESSAGES } from '@core/constants';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false
})
export class HeaderComponent {
  texts = TEXTS.header;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  get username(): string {
    return this.auth.getCurrentUser()?.username || '';
  }

  async confirmLogout(): Promise<void> {
    const confirmed = await this.dialogService.confirm(MESSAGES.LOGOUT_CONFIRMATION);
    if (confirmed) {
      this.logout();
    }
  }

  private logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
