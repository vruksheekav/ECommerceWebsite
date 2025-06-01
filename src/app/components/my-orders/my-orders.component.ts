import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { order } from '../../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{


  orderData:order[]|undefined;
  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.getOrderList();
  }


  cancelOrder(orderId:number| string |undefined){
   orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
       this.product.orderList().subscribe((result)=>{
        this.orderData=result
    })
   })
  }
  getOrderList(){
     this.product.orderList().subscribe((result)=>{
        this.orderData=result
    })

  }

}
