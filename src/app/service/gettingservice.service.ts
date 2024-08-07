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
  getBanners(){
    return this.http.get<any>(baseUrl.baseUrl+environment.bannerUrl)
  }
  getTrendingProducts(){
    return this.http.get<any>(baseUrl.baseUrl+environment.trendingUrl)
  }


}
