import { Injectable } from '@angular/core';
import { UsuarioToken } from '../components/login/usuario';

const USER_KEY = 'userToken';
const USER_AUTH = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() { }

  public saveToken(token: UsuarioToken): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token.token);
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(USER_KEY);
    return token !== null;
  }

  public getToken(): string | undefined {
    const token = window.sessionStorage.getItem(USER_KEY);
    if (token) return token;
    return undefined;
  }

  public getUserRole(): string | undefined {
    const user = window.sessionStorage.getItem(USER_AUTH);
    if (user) {
      const us = JSON.parse(user || "[]");
      return us.rol;
    }
    return undefined;
  }

  public getUser(): string | undefined {
    const user = window.sessionStorage.getItem(USER_AUTH);
    if (user) {
      return user;
    }
    return undefined;
  }

  public getPath(): string | undefined {
    
    const user = window.sessionStorage.getItem(USER_AUTH);

    if (user) {
      const us = JSON.parse(user || "[]");
      if(us.rol === 'Cliente') return "/home-client";
      if(us.rol === 'Admin') return "/home";
    }

    return undefined;
  }

  logout() {
    sessionStorage.removeItem(USER_KEY);
  }

}
