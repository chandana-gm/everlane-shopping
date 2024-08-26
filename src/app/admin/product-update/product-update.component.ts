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
  productList:any[]=[]

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
  constructor(private fb: FormBuilder,private postService:PostServiceService,private Toster:ToastrService,private service:GettingserviceService,private deleteService:DeleteServiceService) {}

  ngOnInit(): void {
 
  
    this.productForm = this.fb.group({
  
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: [''],
      subcategory: ['', Validators.required],
      image: [null],
      isTrending: [false],
      skinColor: ['', Validators.required],
  
      height: ['', Validators.required],
      genders: ['', Validators.required],
      season: ['', Validators.required],
      usage: ['', Validators.required],
      isActive: [false],
      isDeleted: [false],
      createdOn: [{ value: '', disabled: true }] 
    });
    this.createdOn = new Date();
    this.productForm.patchValue({ createdOn: this.createdOn });
  this.getAllProducts()
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

  onSubmit(): void {
    if (this.productForm.valid) {
        const formData = new FormData();
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        formData.append('brand', this.productForm.get('brand')?.value);
        formData.append('subcategory', this.productForm.get('subcategory')?.value);
        formData.append('genders', this.productForm.get('genders')?.value);
        formData.append('skinColor', this.productForm.get('skinColor')?.value);
        formData.append('height', this.productForm.get('height')?.value);
        formData.append('season', this.productForm.get('season')?.value);
        formData.append('usage', this.productForm.get('usage')?.value);
        formData.append('isTrending', this.productForm.get('isTrending')?.value);
        formData.append('isActive', this.productForm.get('isActive')?.value);
        formData.append('isDeleted', this.productForm.get('isDeleted')?.value);
        formData.append('createdOn', this.productForm.get('createdOn')?.value);

        const imageFile = this.productForm.get('image')?.value;
        if (imageFile) {
            formData.append('image', imageFile, imageFile.name);
        }

        this.postService.addProduct(formData).subscribe((data) => {
          console.log('Response:', data);
          this.Toster.success('Product updated successfully!', 'Success');
        },
        (error) => {
          console.error('Error:', error);
          this.Toster.error('Failed to update product.', 'Error');
        });

      
    }
}
addProduct() {
  this.isEdit = false;  
  this.productForm.reset();
 
}
editproduct(item:any){
  this.isEdit = true;
  this.productForm.patchValue(item);


}
deleteProduct(item:any){
  this.deleteService.deleteProduct(item.id).subscribe((data)=>{
    console.log(data);
    this.getAllProducts()
    
  })
}

}
