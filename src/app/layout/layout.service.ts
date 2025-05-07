import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  getCat() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  baseUrl = 'https://api.hippo-crafts.com/user/';

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  editUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editUser/' + id, data, { params });
  }

  upload(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }
  getProducts(): any {
    return this.http.get(this.baseUrl + 'getProducts');
  }
  getProduct(id: string): any {
    return this.http.get(this.baseUrl + 'getProduct/' + id);
  }
  getFaqs(): any {
    return this.http.get(this.baseUrl + 'getFaqs');
  }
  getComments(): any {
    return this.http.get(this.baseUrl + 'getComments');
  }
  getOrdersByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getOrdersByUser/' + id, { params });
  }

  addOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addOrder', data, { params });
  }

  editOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editOrder/' + id, data, { params });
  }


  onPayment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'onPayment', data, { params });
  }
  
  verifyPayment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'verifyPayment', data, { params });
  }

}



