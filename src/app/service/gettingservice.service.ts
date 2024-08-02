import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GettingserviceService {

  constructor(private http:HttpClient) { }


  getMensCategories(){
    return this.http.get<any>(baseUrl.baseUrl+environment.mensCategoryUrl)
  }
  getWomensCategories(){
    return this.http.get<any>(baseUrl.baseUrl+environment.womensCategoryUrl)
  }


  private categoryUrl = 'https://xd7q7vf5-8000.inc1.devtunnels.ms/api/categories/'
  getCategory(){
   return this.http.get<any>(this.categoryUrl)
  }
}
