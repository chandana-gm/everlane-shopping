import { CanActivateFn, Router } from '@angular/router';
import { GettingserviceService } from '../service/gettingservice.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const cartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(GettingserviceService);
  const router = inject(Router);

  return cartService.isCartEmpty().pipe(
    map(isCartEmpty => {
      if (isCartEmpty) {
        router.navigate(['/shopping/cart']); 
        return false;
      }
      return true;
    })
  );
};
