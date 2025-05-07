import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public userJson: any;
  public userType: any;
  public userToken: any;
  public userID: any;
  public userImage: any;
  public userFullName: any;
  public userPhone: any;
  public userEmail: any;
  public userMobile: any;
  public userAddress: any; 
  public userState: any;   
  public userCity: any;

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storageService: StorageService) {
    const data = localStorage.getItem('current');
    if (data) {
      this.setUserFromStorage(data);
    }
  }

  saveCurrentUser(key: string, value: string) {
    const encryptedValue = this.storageService.encrypt(value);
    localStorage.setItem(key, encryptedValue);
    this.setUserFromStorage(encryptedValue); 
  }

  getCurrentUser(key: string): boolean {
    let data = localStorage.getItem(key) || "";
    if (data !== undefined && data !== null && data !== "") {
      this.setUserFromStorage(data);
      return true;
    } else {
      return false;
    }
  }

  removeCurrentUser() {
    const cart = localStorage.getItem('cartList'); // ذخیره موقت سبد
    localStorage.clear(); // پاک کردن کل اطلاعات
    if (cart) {
      localStorage.setItem('cartList', cart); // برگردوندن سبد
    }
    this.clearUserData();
    this.currentUserSubject.next(null); 
  }

  private setUserFromStorage(data: string) {
    const decryptedData = this.storageService.decrypt(data);
    this.userJson = JSON.parse(decryptedData);
    this.userType = this.userJson['type'];
    this.userToken = this.userJson['token'];
    this.userID = this.userJson['_id'];
    this.userImage = this.userJson['image'];
    this.userFullName = this.userJson['fullName'];
    this.userPhone = this.userJson['phone'];
    this.userEmail = this.userJson['email'];
    this.userMobile = this.userJson['mobile'];
    this.userAddress = this.userJson['address']; 
    this.userState = this.userJson['state'];   
    this.userCity = this.userJson['city'];

    this.currentUserSubject.next(this.userJson); // 🔥 این مهمه
  }

  private clearUserData() {
    this.userJson = null;
    this.userType = null;
    this.userToken = null;
    this.userID = null;
    this.userImage = null;
    this.userFullName = null;
    this.userPhone = null;
    this.userEmail = null;
    this.userMobile = null;
    this.userAddress = null;
    this.userState = null;
    this.userCity = null;
  }
  
}
