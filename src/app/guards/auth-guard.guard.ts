import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const NoBackGuard: CanActivateFn = (route, state) => {
  // Get the router instance
  const router = inject(Router);
  // Logic to allow or prevent route activation
  return true; // Allow navigation to the route

};
