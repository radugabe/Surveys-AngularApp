import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';
import { API_ENDPOINTS, API_PATTERNS, MESSAGES, TEXTS } from '@core/constants';
import { replaceTokensWithValues } from '@core/utils';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {
  form!: FormGroup;
  focusedField: 'username' | 'password' | 'confirmPassword' | null = null;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  texts = TEXTS.register;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private auth: AuthService,
    private dialog: DialogService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{4,20}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).*/)
      ]],
      confirmPassword: ['', Validators.required],
      role: ['respondent']
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get passwordRules() {
    const value = this.form.get('password')?.value || '';
    return {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[^A-Za-z0-9\s]/.test(value)
    };
  }

  private passwordsMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  };

  register() {
    if (this.form.invalid) {
      this.dialog.show(MESSAGES.REQUIRED_FIELDS, 'error');
      return;
    }
  
    if (this.form.hasError('passwordsMismatch')) {
      this.dialog.show(MESSAGES.PASSWORD_MATCH, 'error');
      return;
    }
  
    this.checkUsernameAvailability();
  }

  private checkUsernameAvailability() {
    const { username } = this.form.value;

    const url = replaceTokensWithValues(
      API_PATTERNS.CHECK_USERNAME,
      { username }
    );

    this.httpClient.get<User[]>(url).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.dialog.show(MESSAGES.TAKEN_USERNAME, 'error');
      } else {
        this.createNewUser();
      }
    });
  }

  private createNewUser() {
    this.httpClient.get<User[]>(API_ENDPOINTS.USERS).subscribe(allUsers => {
      const newUser = this.prepareNewUser(allUsers);
      this.saveNewUser(newUser);
    });
  }

  private prepareNewUser(allUsers: User[]): User {
    const lastId = allUsers.length > 0
      ? Math.max(...allUsers.map(u => parseInt(u.id)))
      : 0;
  
    const { username, password, role } = this.form.value;
  
    return {
      id: (lastId + 1).toString(),
      username,
      password,
      role
    };
  }

  private saveNewUser(newUser: User) {
    this.httpClient.post<User>(API_ENDPOINTS.USERS, newUser).subscribe(user => {
      this.auth.login(user);
      this.dialog.show(MESSAGES.ACCOUNT_CREATED_SUCCESSFULLY, 'success');
      this.router.navigate(['/surveys']);
    });
  }
}