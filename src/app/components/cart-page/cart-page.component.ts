import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{

  constructor(private product:ProductService){}

  ngOnInit(): void {

    this.product.currentCart().subscribe((result)=>{
      console.warn(result)

    })
    
  }

}
