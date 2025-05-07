import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
const SECRET_KEY = '@AaPmAnAgEr_ApP-DeVeLoPeD-By-PaRsArAd-PrOgRaMmInG!-TeAm@';

@Injectable({
  providedIn: 'root',
})

export class StorageService {

  constructor() { }

  public encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, SECRET_KEY).toString();
  }

  public decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }
}




