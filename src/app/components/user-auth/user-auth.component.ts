import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../../data-type';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    console.warn(data);
    this.user.userSignUp(data);
  }

  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "User not found";
      } else {
        this.localCartToRemoteCart();
        this.localWishlistToRemoteWishlist();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

 localCartToRemoteCart() {
  const data = localStorage.getItem('localCart');
  const user = localStorage.getItem('user');

  if (data && user) {
    const cartDataList = JSON.parse(data);
    const userId = JSON.parse(user).id;

    this.product.getCartList(userId);
    this.product.cartData.subscribe((remoteCart: cart[]) => {
      const remoteProductIds = remoteCart.map(item => item.productId);

      cartDataList.forEach((product: any, index: number) => {
        if (!remoteProductIds.includes(product.id)) {
          const cartData: cart = {
            ...product,
            productId: product.id,
            userId,
          };
          delete cartData.id;

          setTimeout(() => {
            this.product.addToCart(cartData).subscribe(() => {
              if (index === cartDataList.length - 1) {
                localStorage.removeItem('localCart');
              }
            });
          }, 500);
        }
      });
    });
  }
}
localWishlistToRemoteWishlist() {
  const localWishlist = localStorage.getItem('localWishlist');
  const user = localStorage.getItem('user');

  if (localWishlist && user) {
    const wishlistDataList = JSON.parse(localWishlist);
    const userId = JSON.parse(user).id;

    this.product.getWishlist(userId);
    this.product.wishlistData.subscribe((remoteWishlist: any[]) => {
      const remoteProductIds = remoteWishlist.map(item => item.productid);

      wishlistDataList.forEach((product: any, index: number) => {
        if (!remoteProductIds.includes(product.id)) {
          const wishlistItem = {
            ...product,
            productId: product.id,
            userId,
          };
          delete wishlistItem.id;

          setTimeout(() => {
            this.product.addToWishlist(wishlistItem).subscribe(() => {
              if (index === wishlistDataList.length - 1) {
                localStorage.removeItem('localWishlist');
              }
            });
          }, 500);
        }
      });
    });
  }
}


}

