import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string| undefined;
  constructor(private product:ProductService){}

  ngOnInit(): void {
      
  }

  submit(data:product){
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
      if(result){
        this.addProductMessage="Product is added successfully";
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }

}
