import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { cart, product } from '../../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produt-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produt-details.component.html',
  styleUrl: './produt-details.component.css'
})
export class ProdutDetailsComponent implements OnInit {
productData:undefined | product;
productQuantity: number=1;
removeCart=false;
cartData:product|undefined;
cartItems: product[] = [];

  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(): void {
      let productid=this.activeRoute.snapshot.paramMap.get('productid');
      console.warn(productid);
      productid && this.product.getProduct(productid).subscribe((result)=>{
        console.warn(result)
        this.productData=result;

        let cartData= localStorage.getItem('localCart');
        if(productid && cartData){
          let items= JSON.parse(cartData);
          items = items.filter((item:product) => productid == item.id.toString())
          if(items.length){
            this.removeCart=true
          }else{
            this.removeCart=false
          }

        }
        let user = localStorage.getItem('user');

        if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item =  result.filter((item:product)=>productid.toString()===item.productid?.toString())
        if(item.length){
          this.cartData=item[0];
          this.removeCart=true

        }
        })

        this.product.cartData.subscribe((items) => {
    this.cartItems = items;  // store the latest cart items
  });


        }

      })
  }
  handleQuantity(val:string){
     if(this.productQuantity<20 && val==='plus'){
      this.productQuantity=this.productQuantity+1;
     }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity=this.productQuantity-1;
     }
  }
  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
       console.warn(this.productData);
       this.product.localAddToCart(this.productData);
       this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) =>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true
          }
        })
      }
    }
  }

removeToCart(productId: number): void {
  console.log('removeToCart called');

  const user = localStorage.getItem('user');
  if (!user) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  } else {
    const userId = JSON.parse(user).id;

    const item = this.cartItems.find((c: any) => c.productId?.toString() === productId.toString());

    if (item && item.id) {
      this.product.removeToCart(item.id).subscribe(() => {
        console.log('Removed from server, now updating cart list...');
        this.product.getCartList(userId);
        this.removeCart = false;
      });
    } else {
      console.warn('Item not found for removal');
    }
  }
}




}
