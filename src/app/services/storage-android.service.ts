import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'
import { MobileUser } from '../interfaces/MobileUser';

// https://capacitorjs.com/docs/apis/preferences

@Injectable({
  providedIn: 'root'
})
export class StorageAndroidService {

  constructor() { }

  async setUser(user:MobileUser) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  };
  
  async getUser():Promise<string> {
    const { value } = await Preferences.get({ key: 'user' });
    alert(value);
    return value;
  };
  
  async removeUser(){
    await Preferences.remove({ key: 'user' });
  };
  
}
