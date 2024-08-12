import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      brand: [''],
      subcategory: [''],
      image: [null],
      isTrending: [false],
      summer: [false],
      winter: [false],
      rainy: [false],
      autumn: [false],
      isActive: [false],
      isDeleted: [false]
    });
  }

  onSubmit(): void {
    console.log(this.productForm.value);
  }
}
