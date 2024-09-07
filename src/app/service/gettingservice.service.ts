import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

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
  getMobileWidthBanner(){
    return this.http.get<any>(baseUrl.baseUrl + environment.mobileWidthBanner)

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
  getSportswear() {
    return this.http.get<any>(baseUrl.baseUrl + environment.sportsCategory)
  }
  getpartyWearMen() {
    return this.http.get<any>(baseUrl.baseUrl + environment.partywearMenCategory)
  }
  getTopwear() {
    return this.http.get<any>(baseUrl.baseUrl + environment.topWomenCategory)
  }
  getJegginswear() {
    return this.http.get<any>(baseUrl.baseUrl + environment.jegginsWomenCategory)
  }
  Sweaterwear() {
    return this.http.get<any>(baseUrl.baseUrl + environment.sweaterWomenCategory)
  }
  getSubCategories(id: string) {
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.sportsCategory}${id}`)
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
  searchProducts(searchItem: any) {
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.productSearch}${searchItem}`)
  }
  getAddress() {
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.getAddress}`)
  }
  getOrders() {
    return this.http.get<any>(baseUrl.baseUrl + environment.viewOrders)
  }
  getAllProductList() {
    return this.http.get<any>(baseUrl.baseUrl + environment.getallProductList)

  }
  getAllreturnProduct() {
    return this.http.get<any>(baseUrl.baseUrl + environment.getReturnProduct)
  }
  getPickup() {
    return this.http.get<any>(baseUrl.baseUrl + environment.getPickup)
  }

  getRecommdation() {
    return this.http.get<any>(baseUrl.baseUrl + environment.getRecommendation)
  }
  getPaymentUpdation(payerId:any,paymentId:any,token:any) {
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.getPaymentUpdation}?paymentId=${paymentId}&token=${token}&PayerID=${payerId}`);
  }
  cancelOrder(token:any){
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.cancelPayment}?token=${token}`);
  }
  getUserDonatios(){
    return this.http.get<any>(baseUrl.baseUrl+environment.getUserDonation)

  }
  getPagination(page:number){
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.Pagination}`, {params });

 }
 getOrderPagination(page:number){
  let params = new HttpParams().set('page', page.toString());
  return this.http.get<any>(`${baseUrl.baseUrl}${environment.viewOrders}`, {params });

 }
  getNotifications(){
    return this.http.get<any>(baseUrl.baseUrl+environment.getNotifications)
  }
orderSearch(searchItem: any){
  return this.http.get<any>(`${baseUrl.baseUrl}${environment.orderSearch}${searchItem}`)

}
getAllOreders(page:number){
  let params = new HttpParams().set('page', page.toString());
  return this.http.get<any>(`${baseUrl.baseUrl}${environment.viewAllorders}`, {params });

}





  // guard check
  isCartEmpty(): Observable<boolean> {
    return this.getCart().pipe(
      map(response => {
        const items = response.data[0]?.items || [];
        console.log(items.length,'guard checking from service');
        
        return items.length === 0; 
      })
    );
  }


  // adminget
  getDiasterRegister(token?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any>(`${baseUrl.baseUrl}${environment.getDisastRegister}`, { headers });
  }



  getDisasterList() {

    return this.http.get<any>(baseUrl.baseUrl + environment.getDisasterlist)
  }

  getDonationList(id: any) {
    return this.http.get<any>(`${baseUrl.baseUrl}disasters/${id}/donations/`)

  }
  getMyDonation() {
    return this.http.get<any>(baseUrl.baseUrl + environment.myDonation)
  }

}

