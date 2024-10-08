import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl, patchApis } from 'src/environments/environment';
import { postApis } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  postCart(item: any, size: any) {
    let body = {
      'product_id': item,
      'size': size
    }
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToCart}`, body);
  }

  deleteCart(item: any) {

    return this.http.delete<any>(baseUrl.baseUrl + postApis.deleteCart, item)
  }

  postRegistration(item: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.register, item)
  }

  postLogin(loginData: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.logIn, loginData)
  }

  postWishlist(item: any) {
    let body = { 'product_id': item }
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

  postLogout(token?: any) {
    let body = {}
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post<any>(baseUrl.baseUrl + postApis.logOut, body, options)
  }
  forgotPassword(email:any){
    return this.http.post<any>(baseUrl.baseUrl+postApis.forgotPassword,email)
  }
  createAddress(value: any) {
    return this.http.post<any>(baseUrl.baseUrl + postApis.addressCreation, value)
  }
  postDonationReg(item: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    console.log('item', item);
    console.log('token', token)

    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.disasterRegister}`, item, { headers });
  }

  postDisAdminApprove(item: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.patch<any>(`${baseUrl.baseUrl}${postApis.adminApprove}${item}/`, { headers });
  }
  postDonation(item: any, id: any) {
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.postDonation}`, item, id);
  }

  postPlaceOrder(delivery_type: any, payment_method: any, id?: any, existingid?: any, disaster_id?: any, pickups?:any) {
    let body = {
      "order_type": delivery_type,
      "payment_method": payment_method,
      "address_id": id,
      "disaster_id": disaster_id,
      "pickup_location_id": pickups
    }
    return this.http.post<any>(baseUrl.baseUrl + postApis.placeOrder, body)
  }
  addProduct(item: any) {
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.addProduct}`, item)
  }
  requestRequestPost(product_id: any, quantity: any, reason: any) {
    let body = {
      "order_item_id": product_id,
      "return_quantity": quantity,
      "return_reason": reason
    }
    return this.http.post<any>(baseUrl.baseUrl + postApis.returnRequest, body)
  }
  addStockProduct(item:any){

    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.postStock}`,item)
  }
  approvReturn(product_id:any,action:any){
    let body={
      "order_item_id": product_id,
      "action":action
    }
    return this.http.post<any>(`${baseUrl.baseUrl}${postApis.postApproveReturn}`,body)
  }
rejectDisaster(item:any,action:any)
{
  let body={
   
    "approve":action
  }
  return this.http.patch<any>(`${baseUrl.baseUrl}${postApis.rejectDisaster}${item}/`,body)
}
orderStatusUpdate(item:any,action:any){
  {
    let body={
     
      "order_status":action
    }
    return this.http.patch<any>(`${baseUrl.baseUrl}${patchApis.updateOrderStatus}${item}/`,body)
}
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
