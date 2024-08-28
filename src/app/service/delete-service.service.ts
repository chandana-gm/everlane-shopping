import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { baseUrl, environment, patchApis } from 'src/environments/environment';
import { deleteApis } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteServiceService {

  constructor(private http: HttpClient) { }
  wishlistData = new Subject
  cartNumber: any = new Subject();
  pageLoad=new Subject

  // subjects
  sendWithoutRefresh() {
    this.wishlistData.next(null)
  }
  getWithoutRefresh() {
    return this.wishlistData.asObservable()
  }

  cartItemNumbers() {
    this.cartNumber.next();
  }
  getCartItemNumbers() {
    return this.cartNumber.asObservable();
  }


  removeItemFromWishlist(item: any, token?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    // this.sendWithoutRefresh();
    return this.http.delete<any>(`${baseUrl.baseUrl}${deleteApis.removeItemFromWishlist}/${item}/`, { headers })
  }

  removeFromCart() { }


  removeCartitem(item: any, token?: any) {
    return this.http.delete<any>(`${baseUrl.baseUrl}cart-item/${item.id}/delete/`)
  }

  removeAddress(item: any) {
    this.sendWithoutRefresh()
    return this.http.delete<any>(`${baseUrl.baseUrl}${environment.getAddress}${item}/delete/`)
  }
  deleteProduct(item:any)
  {
    return this.http.delete<any>(`${baseUrl.baseUrl}products/${item}/delete/`)
  }


  // patch
  updateProfile(updatedData: any) {
    return this.http.patch<any>(baseUrl.baseUrl + patchApis.updateProfile, updatedData)
  }
  changePassword(data: any) {
    return this.http.patch<any>(baseUrl.baseUrl + patchApis.changePassword, data)
  }
  updateProduct(item:any,formData:any){
    return this.http.patch<any>(`${baseUrl.baseUrl}products/${item}/update/`,formData)
  }
  recommendationPatch(data:any){
    return this.http.patch<any>(baseUrl.baseUrl+patchApis.addQuestionnaire,data)
  }

}
