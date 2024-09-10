import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
export function atLeastOneSeasonSelectedValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const summer = formGroup.get('summer')?.value;
    const winter = formGroup.get('winter')?.value;
    const rainy = formGroup.get('rainy')?.value;
    const autumn = formGroup.get('autumn')?.value;

    // Check if at least one checkbox is checked
    if (summer || winter || rainy || autumn) {
      return null;  // Validation passes, no error
    } else {
      return { atLeastOneSeason: true };  // Validation fails, return error
    }
  };
}


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
  loading = false;
  isSearching: boolean = false;

  modalElement:any
  modal:any

  genderChoices = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
  ];


  createdOn!: Date;
  imagePreview: any
  isEdit = false;
  productId: any;
  producttName: any
  StockProductId: any
  items?: any = []
  currentPage: number = 1;
  totalItems: any;
  next: string | null = null;
  previous: string | null = null;

  itemsall: any[] = []
  productsPage: any[] = []
  isProcesing=false
  searchText: any = ''
  skin_colors = {
    Dark: false,
    Fair: false,
    Medium: false
  };

  heights = {
    Tall: false,
    Short: false,
    Medium: false
  };

  usages = {
    Party: false,
    Casual: false,
    Formal: false,
    Sports: false
  };

  constructor(private fb: FormBuilder, private postService: PostServiceService, private toster: ToastrService, private service: GettingserviceService, private deleteService: DeleteServiceService,private router:Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      subcategory: ['', Validators.required],
      image: [null, [Validators.required]],
      skin_colors: this.fb.group(this.skin_colors, { validators: this.checkboxGroupValidator }),
      heights: this.fb.group(this.heights, { validators: this.checkboxGroupValidator }),
      usages: this.fb.group(this.usages, { validators: this.checkboxGroupValidator }),
      genders: ['', Validators.required],
      is_trending: [false],
      summer: [false],
      winter: [false],
      rainy: [false],
      autumn: [false],
      is_active: [true],

      createdOn: [{ value: '', disabled: true }]  },
       { validators: atLeastOneSeasonSelectedValidator() });
    this.createdOn = new Date();
    this.productForm.patchValue({ createdOn: this.createdOn });
    this.getAllProducts();
    this.stockForm = this.fb.group({
      product: [''],
      size: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
    
    this.loadProducts()


  }


  getAllProducts() {
    this.service.getAllProductList().subscribe((data) => {
      console.log(data);
      this.productList = data.data

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
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onSubmit() {
    console.log('value', this.productForm.value);
    this.loading=true;
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
      formData.append('is_trending', this.productForm.get('is_trending')?.value ? 'true' : 'false');
      formData.append('summer', this.productForm.get('summer')?.value ? 'true' : 'false');
      formData.append('winter', this.productForm.get('winter')?.value ? 'true' : 'false');
      formData.append('rainy', this.productForm.get('rainy')?.value ? 'true' : 'false');
      formData.append('autumn', this.productForm.get('autumn')?.value ? 'true' : 'false');
      formData.append('is_active', 'true');
      formData.append('createdOn', this.productForm.get('createdOn')?.value);

      const imageFile = this.productForm.get('image')?.value;
      if (imageFile instanceof File) {
        formData.append('image', imageFile, imageFile.name);
      }

      if (this.isEdit && this.productId) {
   
        this.deleteService.updateProduct(this.productId, formData).subscribe((data: any) => {
          console.log(data);
          this.loadProducts();
          this.toster.success('Product updated successfully!', 'Success');
          this.productForm.reset();
          this.imagePreview = '';
          this.loading = false;
        //   this. modalElement = document.getElementById('staticBackdrop');
        //   this. modal = new (window as any).bootstrap.Modal(this.modalElement);
        //  this. modal.hide();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        },
          (error: any) => {
            console.error('Error:', error);
            this.toster.error('Failed to update product.', 'Error');
          });
      } else {
    
        this.postService.addProduct(formData).subscribe((data) => {
          this.loadProducts();
          this.toster.success('Product added successfully!', 'Success');
          this.loading = false;
          this.productForm.reset();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // const modalElement = document.getElementById('staticBackdrop');
          // console.log(modalElement);
          
          // const modal = new (window as any).bootstrap.Modal(modalElement);
          // modal.hide();
        

        },
          (error) => {
            console.error('Error:', error);
            this.toster.error('Failed to add product.', 'Error');
          
          });
      }
      this.productForm.reset()
   
    }
    else {
      this.productForm.markAllAsTouched(); 
    }
    
  
  }


 private markAllFieldsAsTouched(): void {
    Object.keys(this.productForm.controls).forEach(field => {
      const control = this.productForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  } 
  checkboxGroupValidator(control: FormGroup): { [key: string]: boolean } | null {
    const atLeastOneChecked = Object.values(control.value).some(value => value);
    return atLeastOneChecked ? null : { 'required': true };
  }
  onFormClick(): void {
    this.markAllFieldsAsTouched();
  }
  addProduct() {
    this.isEdit = false;
    this.productForm.reset();
    const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
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
        is_trending: item.is_trending,
        skin_colors: item.skin_colors,
        heights: item.heights,
        usages: item.usages,
        summer: item.summer,
        winter: item.winter,
        rainy: item.rainy,
        autumn: item.autumn,
        createdOn: item.createdOn,
        image: item.image ? item.image : null 
      });
      
      if (typeof item.image === 'string') {
        this.imagePreview = item.image;
      } else if (item.image instanceof Blob || item.image instanceof File) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(item.image);
      }
      this.productId = item.id;

  }
}


  deleteProduct(item: any) {
    this.loading = true;
    this.deleteService.deleteProduct(item.id).subscribe((data) => {
      console.log(data);
      this.loading = false;

      this.loadProducts();
      this.toster.error('Product deleted successfully!', 'Success');
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
    this.isSearching = true;
    if (this.searchText != '') {
      this.service.searchProducts(this.searchText).subscribe((data) => {
        this.productsPage = data.data;
        console.log(data);
      });
    } else {
      this.loadProducts();
    }
  }
  loadProducts(page: number = 1): void {
   this.isProcesing=true
    this.isSearching = false;
    this.service.getPagination(page).subscribe(data => {
      this.isProcesing=false
      console.log('paginated', data);
      this.productsPage = data.results;
      this.totalItems = data.count;
      this.next = data.next;
      this.previous = data.previous;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts(page);
  }

  loadNextPage(): void {
    if (this.next) {
      this.currentPage++;
      this.loadProducts(this.currentPage);
    }
  }

  loadPreviousPage(): void {
    if (this.previous) {
      this.currentPage--;
      this.loadProducts(this.currentPage);
    }
  }

}

