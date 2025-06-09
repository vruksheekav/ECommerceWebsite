import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { wishlist } from '../../data-type';
import { ProductService } from '../../services/product.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css'
})
export class WishlistPageComponent implements OnInit{

  wishlistData:wishlist[]|undefined;
item: any;

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {

    this.product.currentWishlist().subscribe((result)=>{
      this.wishlistData=result;
    })
    
    
  }


}
