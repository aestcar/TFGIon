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
import { Admin } from '../interfaces/Admin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  userData?: User;

  adminGlobal: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getLocalUser(){
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
        localStorage.clear()
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  /* -----------------------  OTHER STUFF  ---------------------------------- */

  esAdminLocalStorage(uid: any) {
    return this.httpClient.get<Admin>(
      'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/admins/' +
        uid +
        '.json'
    );
  }

  buscarUsuariosPorID(id: string) {
    return this.httpClient.get<any>(
      'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/users/' +
        id +
        '.json'
    );
  }
}
