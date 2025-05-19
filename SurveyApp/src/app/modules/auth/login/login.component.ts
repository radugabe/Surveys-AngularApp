import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/user.model';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';
import { API_PATTERNS, MESSAGES, TEXTS } from '@core/constants';
import { replaceTokensWithValues } from '@core/utils';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;
  texts = TEXTS.login;

  constructor(
    private router: Router, 
    private httpClient: HttpClient, 
    private auth: AuthService, 
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/surveys']);
    }
  }  

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (!this.validateFields()) {
      return;
    }

    const url = replaceTokensWithValues(
      API_PATTERNS.LOGIN_QUERY,
      { username: this.username, password: this.password }
    );
    
    this.httpClient.get<User[]>(url).subscribe(users => {
      if (users.length > 0) {
        this.handleSuccessfulLogin(users[0]);
      } else {
        this.dialog.show(MESSAGES.LOGIN_FAIL, 'error');
      }
    });
  }
  
  private validateFields(): boolean {
    if (!this.username || !this.password) {
      this.dialog.show(MESSAGES.REQUIRED_FIELDS, 'error');
      return false;
    }
    return true;
  }
  
  private handleSuccessfulLogin(user: User): void {
    this.auth.login(user);
    this.dialog.show(MESSAGES.LOGIN_SUCCESS, 'success');
    this.router.navigate(['/surveys']);
  }
}