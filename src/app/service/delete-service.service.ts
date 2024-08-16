import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { deleteApis } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteServiceService {

  constructor(private http:HttpClient) { }
  wishlistData= new Subject
  private cartNumber = new Subject<number>();

// subjects
  sendWithoutRefresh(){
    this.wishlistData.next(null)
  }
  getWithoutRefresh(){
   return this.wishlistData.asObservable()
  }

  cartItemNumbers(cartLength: number) {
    this.cartNumber.next(cartLength);
  }

  getCartItemNumbers() {
    return this.cartNumber.asObservable();
  }


  removeItemFromWishlist(item:any,token:any){
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    // this.sendWithoutRefresh();
    return this.http.delete<any>(`${baseUrl.baseUrl}${deleteApis.removeItemFromWishlist}/${item}/`,{headers})
  }

  removeFromCart(){}

  
  removeCartitem(item:any,token:any){
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    
    
    return this.http.delete<any>(`${baseUrl.baseUrl}cart-item/${item.id}/delete/`,{headers})
  }
}

