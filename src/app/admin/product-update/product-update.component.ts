import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productForm!: FormGroup;
  stockForm!: FormGroup;
  productList: any[] = []
  productName: any
  isProcessing = false;

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

  usageChoices = [
    { value: 'CASUAL', label: 'Casual' },
    { value: 'FORMAL', label: 'Formal' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'PARTY', label: 'Party' },
  ];

  createdOn!: Date;
  imagePreview: any
  isEdit = false;
  productId: any;
  producttName: any
  StockProductId: any
  items?: any = []
  itemarray?: any = []
  searchText: any = ''
  constructor(private fb: FormBuilder, private postService: PostServiceService, private toster: ToastrService, private service: GettingserviceService, private deleteService: DeleteServiceService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      subcategory: ['', Validators.required],
      image: [null],
      isTrending: [false],
      skin_colors: this.fb.array([], Validators.required),
      heights: this.fb.array([], Validators.required),
      usages: this.fb.array([], Validators.required),
      genders: ['', Validators.required],
      summer: [false],
      winter: [false],
      rainy: [false],
      autumn: [false],
      // isActive: [false],
      // isDeleted: [false],
      createdOn: [{ value: '', disabled: true }]
    });
    this.createdOn = new Date();
    this.productForm.patchValue({ createdOn: this.createdOn });
    this.getAllProducts();
    this.stockForm = this.fb.group({
      product: [''],
      size: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });


  }

  onCheckboxChange(event: any, formArrayName: string) {
    const formArray: FormArray = this.productForm.get(formArrayName) as FormArray;

    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }

  isChecked(formArrayName: string, value: string): boolean {
    const formArray: FormArray = this.productForm.get(formArrayName) as FormArray;
    return formArray.value.includes(value);
  }


  getAllProducts() {
    this.service.getAllProductList().subscribe((data) => {
      console.log(data);
      this.productList = data.data
      // this.itemarray=data.data
      this.items = data.data;
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
    console.log(this.productForm.value);

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
      formData.append('usages', JSON.stringify(this.productForm.get('usages')?.value));
      formData.append('isTrending', this.productForm.get('isTrending')?.value ? 'true' : 'false');
      // formData.append('isActive', this.productForm.get('isActive')?.value ? 'true' : 'false');
      formData.append('summer', this.productForm.get('summer')?.value ? 'true' : 'false');
      formData.append('winter', this.productForm.get('winter')?.value ? 'true' : 'false');
      formData.append('rainy', this.productForm.get('rainy')?.value ? 'true' : 'false');
      formData.append('autumn', this.productForm.get('autumn')?.value ? 'true' : 'false');
      // formData.append('isDeleted', this.productForm.get('isDeleted')?.value ? 'true' : 'false');
      formData.append('createdOn', this.productForm.get('createdOn')?.value);

      const imageFile = this.productForm.get('image')?.value;
      if (imageFile instanceof File) {
        formData.append('image', imageFile, imageFile.name);
      }

      if (this.isEdit && this.productId) {
        this.isProcessing = true;
        this.deleteService.updateProduct(this.productId, formData).subscribe((data: any) => {
          console.log(data);

          this.toster.success('Product updated successfully!', 'Success');
          this.isProcessing = false;
          this.getAllProducts();
        },
          (error: any) => {
            console.error('Error:', error);
            this.toster.error('Failed to update product.', 'Error');
          });
      } else {
        this.isProcessing = true;
        this.postService.addProduct(formData).subscribe((data) => {
          this.toster.success('Product added successfully!', 'Success');
          this.isProcessing = false;
          this.productForm.reset();

        },
          (error) => {
            console.error('Error:', error);
            this.toster.error('Failed to add product.', 'Error');
            this.isProcessing = false;
          });
      }
      this.productForm.reset()
    }
    else {
      this.markAllFieldsAsTouched()
    }

  }


  private markAllFieldsAsTouched(): void {
    Object.keys(this.productForm.controls).forEach(field => {
      const control = this.productForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  onFormClick(): void {
    this.markAllFieldsAsTouched();
  }
  addProduct() {
    this.isEdit = false;
    this.productForm.reset();
  }
  editproduct(item: any) {
    {
      this.isEdit = true;
      this.productForm.patchValue({
        name: item.name,
        description: item.description,
        price: item.price,
        brand: item.brand,
        subcategory: item.subcategory,
        genders: item.genders,
        isTrending: item.isTrending,
        summer: item.summer,
        winter: item.winter,
        rainy: item.rainy,
        autumn: item.autumn,
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        createdOn: item.createdOn
      });

      // Reset and patch FormArrays
      this.resetFormArray(this.productForm.get('skin_colors') as FormArray, item.skin_colors);
      this.resetFormArray(this.productForm.get('heights') as FormArray, item.heights);
      this.resetFormArray(this.productForm.get('usages') as FormArray, item.usages);

      this.imagePreview = item.image;
      this.productId = item.id;
    }


  }
  resetFormArray(formArray: FormArray, values: any[]) {
    formArray.clear();
    values.forEach(value => formArray.push(this.fb.control(value)));
  }

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
  stockmodal(item: any) {
    console.log(item.id);
    this.productName = item.name
    this.productId = item.id
    this.stockForm.patchValue({
      product: item.id
    })

  }
  stockAdd() {
    if (this.stockForm.valid) {
      console.log(this.stockForm.value);
      this.postService.addStockProduct(this.stockForm.value).subscribe((res) => {
        this.getAllProducts();

        this.toster.success(res.message);
      },
        (error) => {

          this.toster.error('Failed to add product. Please try again.', 'Error');
        }
      )


    }


  }
  filteredItems() {
    if (this.searchText != '') {
      console.log(this.itemarray);

      this.productList = this.items.filter((item: any) => item.name == this.searchText)
      console.log(this.searchText);

    } else {
      this.productList = this.items
    }
  }

}

