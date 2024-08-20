export const environment = {
    production: false,
    mensCategoryUrl: 'subcategories/?category_id=1',
    womensCategoryUrl: 'subcategories/?category_id=3',
    bannerUrl:'banners/',
    trendingUrl:'products/trending/',
    autumnSeasonProductsUrl:'products/autumn/',
    rainySeasonProductsUrl:'products/rainy/',
    winterSeasonProductsUrl:'products/winter/',
    summerSeasonProductsUrl:'products/summer/',
    shirtCategory:'products/?subcategory=1',
    jeansCategory:'products/?subcategory=2',
    tshirtCategory:'products/?subcategory=3',
    trousersCategory:'products/?subcategory=4',
    kurtisCategory:'products/?subcategory=5',
    shortsCategory:'products/?subcategory=6',
    tshirtWomenCategory:'products/?subcategory=7',
    jeansWomenCategory:'products/?subcategory=8',
    skirtsWomenCategory:'products/?subcategory=9',
    cartProducts:'carts/',
    getWishlist:'wishlist/',
    getDisastRegister:'disasters/pending/',
    getDisasterlist:'disasters/'

  };


export const postApis = {
    production: false,
    addToCart: 'add-to-cart/',
    addToWishlist:'wishlist/add/',
    register:'register/',
    logIn:'login/',
    logOut:'logout/',
    deleteCart:'cart-item/id/delete/',
    cartItemQuantityUpdate:'update-cart-item-quantity/',
    disasterRegister:'disasters/',
    adminApprove:'disasters/approve/',
    postDonation:'donations/'
   
  };

export const deleteApis = {
    production: false,
    removeItemFromWishlist: 'wishlist/delete',
     deleteCart:'cart-item/ delete'
  };
export const baseUrl = {
    production: false,
    baseUrl: 'http://18.143.206.136/api/',
  };