import { Injectable } from '@angular/core';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { FacebookAuthProvider } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { User as IUser} from '../interfaces/User';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  userData?: User;

  adminGlobal: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getLocalUser() {
    return window.localStorage.getItem('user');
  }

  /* -----------------------  GOOGLE  ---------------------------------- */

  async getAutenticacion() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    this.userData = user;
    // Local Storage
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  /* -----------------------  FACEBOOK  ---------------------------------- */

  async getAutenticacionFacebook() {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();

    const res = await signInWithPopup(auth, provider);

    const res2 = await this.getAutenticacion2Facebook(res);

    return res2;
  }

  getAutenticacion2Facebook(result: UserCredential) {
    // The signed-in user info.
    const user = result.user;

    this.userData = user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential!.accessToken;

    // Local Storage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  /* -----------------------  CÓRDOVA - Google  ---------------------------------- */

  // async getAutorizacionCordova(){
  //   let resLogin:MobileUser = await this.googlePlus.login({});
  //   return resLogin;

  //   /*await this.googlePlus.login({ })
  //     .then(res => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch(err => {return null});
  //       console.log(err);
  //       return undefined;*/

  // }

  /* -----------------------  LOGOUT (Arreglar)  ---------------------------------- */

  hacerSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  /* -----------------------  OTHER STUFF  ---------------------------------- */

  getUsers(): Observable<IUser[]>{
    return this.httpClient.get<IUser[]>('http://localhost:3000/users');
  }

  getUser(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>('http://localhost:3000/users/' + id);
  }
}
