import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user$ = this.auth.authState;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['shelf']);
      }
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
  }

  logout() {
    return this.auth.signOut();
  }
}
