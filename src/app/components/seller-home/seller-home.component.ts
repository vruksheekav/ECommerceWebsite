import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined| string;
  constructor(private product:ProductService){}

  ngOnInit(): void {
      this.list(); //pehle list wala function ka material idher tha
  }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is deleted";

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);
  }
  list(){
     this.product.productList().subscribe((result)=>{
     
        if(result){
          this.productList=result;
        }
      });
  }

}
