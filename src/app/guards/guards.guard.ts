import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 

  const isAdmin = localStorage.getItem('Admin');

  if (isAdmin) {
    return true; 
  } else {
    router.navigate(['/auth/login']);
    return false; 
  }
};
