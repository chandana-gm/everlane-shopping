import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { postApis } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http:HttpClient) { }

  postCart(item:any){
   console.log('id',item);
   const headers = new HttpHeaders({
    'Authorization':'', 
   
  });
        
  return  this.http.post<any>(`${baseUrl.baseUrl}${postApis.addToCart}`,item, { headers });
  }
  postRegistration(item:any){
  return this.http.post<any>(baseUrl.baseUrl+postApis.register,item)
  }
  postLogin(logindata:any){
    return this.http.post<any>(baseUrl.baseUrl+postApis.logIn,logindata)
   
  }
}
