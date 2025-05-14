import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);

  const seller = localStorage.getItem('seller');
  if (seller) {
    return of(true); 
  }

  return sellerService.isSellerLoggedIn.pipe(
    map(isLoggedIn => isLoggedIn)
  );
};
