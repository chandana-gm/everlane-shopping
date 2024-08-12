import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GettingserviceService {

  constructor(private http: HttpClient) { }


  getMensCategories() {
    return this.http.get<any>(baseUrl.baseUrl + environment.mensCategoryUrl)
  }
  getWomensCategories() {
    return this.http.get<any>(baseUrl.baseUrl + environment.womensCategoryUrl)
  }
  getBanners() {
    return this.http.get<any>(baseUrl.baseUrl + environment.bannerUrl)
  }
  getTrendingProducts() {
    return this.http.get<any>(baseUrl.baseUrl + environment.trendingUrl)
  }
  getAutumnSeasonProducts() {
    return this.http.get<any>(baseUrl.baseUrl + environment.autumnSeasonProductsUrl)
  }
  getWinterSeasonProducts() {
    return this.http.get<any>(baseUrl.baseUrl + environment.winterSeasonProductsUrl)
  }
  getSummerSeasonProducts() {
    return this.http.get<any>(baseUrl.baseUrl + environment.summerSeasonProductsUrl)
  }
  getMansoonSeasonProducts() {
    return this.http.get<any>(baseUrl.baseUrl + environment.rainySeasonProductsUrl)
  }
  getShirtCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.shirtCategory)
  }
  getJeansMenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.jeansCategory)
  }
  getTShirtMenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.tshirtCategory)
  }
  getTrousersCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.trousersCategory)
  }
  getKurtiesWomenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.kurtisCategory)
  }
  getShortsCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.shortsCategory)
  }
  getTShirtWimenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.tshirtWomenCategory)
  }
  getJeansWomenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.jeansWomenCategory)
  }
  getSkirtsWomenCategory() {
    return this.http.get<any>(baseUrl.baseUrl + environment.skirtsWomenCategory)
  }
  getCart(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any>(baseUrl.baseUrl + environment.cartProducts,{headers})
  }
  getWishlist(token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any>(baseUrl.baseUrl + environment.getWishlist,{headers})
  }
}
