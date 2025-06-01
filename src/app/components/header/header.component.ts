import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  menuType: string = 'default';
  sellerName:string="";
  searchResult:undefined|product[];
  userName:string="";
  cartItems=0;
  constructor(private route: Router, private product:ProductService) {}

  ngOnInit(): void {

    

    this.route.events.subscribe((val: any) =>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType = 'seller';
        } else if(localStorage.getItem('user')){
          let userStore= localStorage.getItem('user');
          let userData= userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id)
       
        }else{
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }

   this.product.cartData.subscribe((items)=>{
    this.cartItems=items.length;
   });

  }


logout(){
  localStorage.removeItem('seller');
  this.route.navigate(['/home'])
}
userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([]);

}

searchProduct(query:KeyboardEvent){
  if(query){
    const element = query.target as HTMLInputElement;
     this.product.searchProduct(element.value).subscribe((result)=>{
      result.length=5;
      this.searchResult=result;
     })
  }

}
hideSearch(){
  this.searchResult=undefined
}
submitSearch(val:string){
 console.warn(val)
 this.route.navigate([`search/${val}`])
}
redirectToDetails(id:number){
  this.route.navigate(['/product-details/'+id])
}


}
