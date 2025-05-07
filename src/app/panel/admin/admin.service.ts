import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.hippo-crafts.com/admin/';

  constructor(private http: HttpClient) { }

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }

  upload(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }

  login(data: any): any {
    return this.http.post(this.baseUrl + 'login', data);
  }

  getUsers(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUsers', { params });
  }
  authUser(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'authUser', data, { params });
  }

  editUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editUser/' + id, data, { params });
  }

  deleteUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUser/' + id, { params });
  }

  getProducts(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getProducts', { params });
  }
  deleteProduct(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteProduct/' + id, { params });
  }
  addProduct(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addProduct', data, { params });
  }

  editProduct(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editProduct/' + id, data, { params });
  }

  addFaq(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addFaq', data, { params });
  }

  editFaq(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editFaq/' + id, data, { params });
  }

  deleteFaq(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFaq/' + id, { params });
  }
  getFaqs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getFaqs', { params });
  }


  addGallery(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addGallery', data, { params });
  }
  deleteGallery(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteGallery/' + id, { params });
  }
  getGallery(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getGallery', { params });
  }
  editGallery(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editGallery/' + id, data, { params });
  }

  addComment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addComment', data, { params });
  }
  deleteComment(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteComment/' + id, { params });
  }
  getComments(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getComments', { params });
  }
  editComment(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editComment/' + id, data, { params });
  }

  addOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addOrder', data, { params });
  }
  deleteOrder(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteOrder/' + id, { params });
  }
  getOrders(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getOrders', { params });
  }
  editOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editOrder/' + id, data, { params });
  }

  //#region Admins
  getAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAdmins', { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addAdmin', data, { params });
  }
  editAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  //#endregion

}
