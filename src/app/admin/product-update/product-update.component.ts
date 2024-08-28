import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent  implements OnInit{

  productForm!: FormGroup;
  stockForm!:FormGroup;
  productList:any[]=[]
  productName:any

  skinColorChoices = [
    { value: 'FAIR', label: 'Fair' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'DARK', label: 'Dark' },
  ];

  heightChoices = [
    { value: 'SHORT', label: 'Short' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'TALL', label: 'Tall' },
  ];

  genderChoices = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
  ];

  seasonChoices = [
    { value: 'SUMMER', label: 'Summer' },
    { value: 'WINTER', label: 'Winter' },
    { value: 'MONSOON', label: 'Monsoon' },
    { value: 'AUTUMN', label: 'Autumn' },
  ];

  usageChoices = [
    { value: 'CASUAL', label: 'Casual' },
    { value: 'FORMAL', label: 'Formal' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'PARTY', label: 'Party' },
  ];
 
  createdOn!: Date;
  imagePreview: any
  isEdit = false;
  productId:any;
  producttName:any
  StockProductId:any
  constructor(private fb: FormBuilder,private postService:PostServiceService,private toster:ToastrService,private service:GettingserviceService,private deleteService:DeleteServiceService) {}

  ngOnInit(): void {
 
  
    this.productForm = this.fb.group({
  
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: [''],
      subcategory: ['', Validators.required],
      image: [null],
      isTrending: [false],
      skin_colors: ['', Validators.required],
  
      heights: ['', Validators.required],
      genders: ['', Validators.required],
      season: ['', Validators.required],
      usages: ['', Validators.required],
      isActive: [false],
      isDeleted: [false],
      createdOn: [{ value: '', disabled: true }] 
    });
    this.createdOn = new Date();
    this.productForm.patchValue({ createdOn: this.createdOn });
  this.getAllProducts();

  this.stockForm = this.fb.group({
    product:[''],
    size: ['', Validators.required],
    stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  
  }
 




  getAllProducts(){
 this.service.getAllProductList().subscribe((data)=>{
      console.log(data);
      this.productList=data.data 

      
    })
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.productForm.patchValue({
        image: file
      });
    }
  }

//   onSubmit(): void {
//     if (this.productForm.valid) {
    
      
//         const formData = new FormData();
   
//         formData.append('name', this.productForm.get('name')?.value);
//         formData.append('description', this.productForm.get('description')?.value);
//         formData.append('price', this.productForm.get('price')?.value);
//         formData.append('brand', this.productForm.get('brand')?.value);
//         formData.append('subcategory', this.productForm.get('subcategory')?.value);
//         formData.append('genders', this.productForm.get('genders')?.value);
//         const skinColors = this.productForm.get('skin_colors')?.value;
//         formData.append('skin_colors', JSON.stringify(skinColors));
//         formData.append('heights',JSON.stringify(this.productForm.get('heights') ?.value));
//         formData.append('season', this.productForm.get('season')?.value);
//         formData.append('usages',JSON.stringify(this.productForm.get('usages') ?.value));
//         formData.append('isTrending', this.productForm.get('isTrending')?.value);
//         formData.append('isActive', this.productForm.get('isActive')?.value);
//         formData.append('isDeleted', this.productForm.get('isDeleted')?.value);
//         formData.append('createdOn', this.productForm.get('createdOn')?.value);

//         const imageFile = this.productForm.get('image')?.value;
//         if (imageFile) {
//             formData.append('image', imageFile, imageFile.name);
//         }
      
//         this.postService.addProduct(formData).subscribe((data) => {
//           console.log('Response:', data);
//           this.Toster.success('Product add successfully!', 'Success');
//         },
//         (error) => {
//           console.error('Error:', error);
//           this.Toster.error('Failed to add product.', 'Error');
//         });
//         if(this.isEdit)
//         {
//           const id = this.productForm.get('id')?.value;
//           console.log(id);
          
//           this.deleteService.updateProduct(id,formData).subscribe((data)=>{
//             console.log('updated',data);
            
//           })
//         }
//       }
      
    
// }
onSubmit() {
  if (this.productForm.valid) {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('brand', this.productForm.get('brand')?.value);
    formData.append('subcategory', this.productForm.get('subcategory')?.value);
    formData.append('genders', this.productForm.get('genders')?.value);
    formData.append('skin_colors', JSON.stringify(this.productForm.get('skin_colors')?.value));
    formData.append('heights', JSON.stringify(this.productForm.get('heights')?.value));
    formData.append('season', this.productForm.get('season')?.value);
    formData.append('usages', JSON.stringify(this.productForm.get('usages')?.value));
    formData.append('isTrending', this.productForm.get('isTrending')?.value);
    formData.append('isActive', this.productForm.get('isActive')?.value);
    formData.append('isDeleted', this.productForm.get('isDeleted')?.value);
    formData.append('createdOn', this.productForm.get('createdOn')?.value);

    const imageFile = this.productForm.get('image')?.value;
    if (imageFile instanceof File) {
      formData.append('image', imageFile, imageFile.name);
    }

    if (this.isEdit && this.productId) {
     
      this.deleteService.updateProduct(this.productId, formData).subscribe((data:any) => {
        console.log(data);
        
        this.toster.success('Product updated successfully!', 'Success');
        this.getAllProducts();
      },
      (error:any) => {
        console.error('Error:', error);
        this.toster.error('Failed to update product.', 'Error');
      });
    } else {
    
      this.postService.addProduct(formData).subscribe((data) => {
        this.toster.success('Product added successfully!', 'Success');
        this.getAllProducts();
      },
      (error) => {
        console.error('Error:', error);
        this.toster.error('Failed to add product.', 'Error');
      });
    }
  }
}
addProduct() {
  this.isEdit = false;  
  this.productForm.reset();
 
}
editproduct(item:any){
  this.isEdit = true;
  this.productForm.patchValue(item);
    this.imagePreview = item.image;
    this.productId = item.id;
}



// deleteProduct(item:any){
//   this.deleteService.deleteProduct(item.id).subscribe((data)=>{
//     console.log(data);
//     this.getAllProducts()
    
//   })
// }
deleteProduct(item: any) {
  this.deleteService.deleteProduct(item.id).subscribe(() => {
    this.getAllProducts();
    this.toster.success('Product deleted successfully!', 'Success');
  },
  (error) => {
    console.error('Error:', error);
    this.toster.error('Failed to delete product.', 'Error');
  });
}
stockmodal(item:any){
  console.log(item.id);
this.productName=item.name
this.productId=item.id
this.stockForm.patchValue({
  product:item.id
})
  
}
stockAdd(){
  if (this.stockForm.valid) {
    console.log(this.stockForm.value);
    this.postService.addStockProduct(this.stockForm.value).subscribe((res)=>{
   this.getAllProducts();
  
    // Show success notification
    this.toster.success(res.message);
  },
  (error) => {
    // Show error notification
    this.toster.error('Failed to add product. Please try again.', 'Error');
  }
)


}


}
}

