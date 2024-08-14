import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { postApis } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  postCart(item: any, token: any) {
    let body = {'product_id': item}
    const headers = new HttpHeaders({'Authorization': `Token ${token}`});
    const options = { headers: headers };
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToCart}`, body, options);
  }

deleteCart(item:any){

  return this.http.delete<any>(baseUrl.baseUrl + postApis.deleteCart, item)
}

  postRegistration(item: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.register, item)
  }

  postLogin(loginData: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.logIn, loginData)
  }

  postWishlist(item: any,) {
    let body = {'product': item}
    // const headers = new HttpHeaders({'Authorization': `Token ${token}`});
    // const options = { headers: headers };
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToWishlist}`, body);
  }

  cartItemUpdatedecreament(item: any, token: any) {
    let body = {
      "cart_item_id": item,
      "action": "decrease"
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post<any>(baseUrl.baseUrl + postApis.cartItemQuantityUpdate, body, options)
  }
  cartItemUpdateIncrement(item: any, token: any) {
    let body = {
      "cart_item_id": item,
      "action": "increase"
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post<any>(baseUrl.baseUrl + postApis.cartItemQuantityUpdate, body, options)
  }

  postLogout(token:any) {
    let body={}
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post<any>(baseUrl.baseUrl + postApis.logOut,body,options) 
  }
  postDonationReg(item: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.donateRegister, item)
  }





  // encript and decrypt token
  encryptData(data: any, key: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }
  decryptData(encryptedData: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
