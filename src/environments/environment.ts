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
    topWomenCategory:'products/?subcategory=11',
    jegginsWomenCategory:'products/?subcategory=13',
    sweaterWomenCategory:'products/?subcategory=14',
    partywearMenCategory:'products/?subcategory=16',
    sportsCategory:'products/?subcategory=15',
    cartProducts:'carts/',
    getWishlist:'wishlist/',
    getDisastRegister:'disasters/pending/',
    getDisasterlist:'disasters/',
    getAllProducts:'products/',
    getProfile:'profile/',
    productSearch:'products/?query=',
    getDonationList:'disasters/donations/',
    getAddress:'addresses/',
    myDonation:'my-disasters/',
    viewOrders:'orders/',
<<<<<<< HEAD
    getallProductList:'products/',
    getReturnProduct:'return-pending/',
    getPickup:'pickups/'
=======
    getRecommendation:'recommendations/'
>>>>>>> d98ab1b9a2ce2b45ef7df4b0dd9f32b8d11ce768

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
    donateRegister:'disasters/',
    addressCreation:'addresses/create/',
    placeOrder:'place-order/',
    returnRequest:'request-return/',

    disasterRegister:'disasters/',
    adminApprove:'disasters/approve/',
    postDonation:'donations/',
    addProduct:'products/create/',
    postStock:'add-product-item/',
    postApproveReturn:'process-return/'
   
  };

export const deleteApis = {
    production: false,
    removeItemFromWishlist: 'wishlist/delete',
     deleteCart:'cart-item/delete',

     
  };
export const patchApis = {
    production: false,
    updateProfile: 'profile/update/',
    changePassword:'profile/change-password/',
    addQuestionnaire:'questionnaire/'
  };
export const baseUrl = {
    production: false,
    baseUrl: 'http://18.143.206.136/api/',
    subCategories:'products/?subcategory='
  };