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

  postCart(item: any) {
    this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToCart}`, item)
  }
  postRegistration(item: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.register, item)
  }
  postLogin(loginData: any) {

    return this.http.post<any>(baseUrl.baseUrl + postApis.logIn, loginData)
  }

  postWishlist(item: any, token: any) {
    let body={
      'product':item
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToWishlist}`, body, options);
  }

postLogout(){
  
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
