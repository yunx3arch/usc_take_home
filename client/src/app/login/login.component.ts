import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const requestBody = { username, password };

      this.http.post<{ token: string }>('http://localhost:5001/api/auth/login', requestBody)
        .subscribe({
          next: (response) => {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.loginFailed = true;
            console.error('Login failed', err);
          }
        });
    }
  }
}
