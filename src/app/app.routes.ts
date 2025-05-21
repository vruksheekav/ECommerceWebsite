import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
    {
        path:'home', component:HomeComponent
    },
    {
        path: 'seller-auth', component:SellerAuthComponent
    },
    {
        path: 'seller-home', component:SellerHomeComponent,
        canActivate:[authGuard]
    },
    {
        component:SellerAddProductComponent,
        path:'seller-add-product',
        canActivate:[authGuard]

    },
    {
        path:'seller-update-product/:id',
        component:SellerUpdateProductComponent,
        canActivate:[authGuard]

    },
    {
        path:'search/:query',
        component:SearchComponent
    }

];
