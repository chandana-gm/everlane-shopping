import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { postApis } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http:HttpClient) { }

  postCart(item:any){
    this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToCart}`,item)
  }
}
