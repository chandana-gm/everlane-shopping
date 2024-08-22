import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

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
  getCart() {
    return this.http.get<any>(baseUrl.baseUrl + environment.cartProducts)
  }
  getWishlist(token?: any) {
    return this.http.get<any>(baseUrl.baseUrl + environment.getWishlist)
  }
  getAllProducts(id: any) {
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.getAllProducts}${id}/`)
  }
  getProfile() {
    return this.http.get<any>(baseUrl.baseUrl + environment.getProfile)
  }
  searchProducts(searchItem:any){
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.productSearch}${searchItem}`)
  }
  getAddress(){
    return this.http.get<any>(baseUrl.baseUrl+environment.getAddress)
  }

  
  // adminget
  getDiasterRegister(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });    
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.getDisastRegister}`, { headers });
  }
  // getDisasterList( token?:any)
  // {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Token ${token}`
  //   });
  //   console.log(token);
    
  //   return this.http.get<any>(baseUrl.baseUrl+ environment.getDisasterlist,{headers})
  // }
  getDisasterList()
  {
   
    return this.http.get<any>(baseUrl.baseUrl+ environment.getDisasterlist)
  }

  getDonationList(id:any)
  {
return this.http.get<any>(`${baseUrl.baseUrl}disasters/${id}/donations/`)

  }
  getMyDonation(){
    return this.http.get<any>(baseUrl.baseUrl+ environment.myDonation)
  }

  }

 