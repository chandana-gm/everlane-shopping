import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent {
  cartClick() {
    const button = document.querySelector('.cart-button');
    if (button) {
      button.classList.add('clicked');

      const addedSpan = button.querySelector('span.added');
      if (addedSpan) {
        addedSpan.classList.add('show');
      }
      
      const removeSpan = button.querySelector('span.add-to-cart');
      if (removeSpan) {
        removeSpan.classList.add('hide');
      }
    }
  }
}
