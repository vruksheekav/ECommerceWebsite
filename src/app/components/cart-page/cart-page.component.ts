import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cart, priceSummary } from '../../data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']  // fixed typo styleUrl => styleUrls
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: number | string | undefined) {
    if (cartId && this.cartData) {
      this.product.removeToCart(cartId).subscribe(() => {
        this.loadDetails();
      });
    }
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;

      // Remove navigation on empty cart to show the empty cart image instead
      // if (!this.cartData.length) {
      //   this.router.navigate(['/home']);
      // }
    });
  }
}
