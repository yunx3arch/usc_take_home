import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLoggedIn(): boolean {
        if (typeof localStorage === 'undefined') {
          return false;
        }
        return !!localStorage.getItem('authToken');
    }
}
