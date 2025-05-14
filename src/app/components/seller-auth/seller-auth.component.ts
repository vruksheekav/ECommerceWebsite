import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';
import { signUp } from '../../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  showLogin=false;
 authError:string='';
  constructor(private seller:SellerService){}

  ngOnInit(): void {
      // this.seller.reloadSeller()
  }
   signUp(data:signUp):void{
    console.warn(data)
    this.seller.userSignUp(data);
   }
    login(data:signUp):void{
    console.warn(data)
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
     if(isError){
      this.authError="Email or password is not correct";
     }
    })
   }
   openLogin(){
    this.showLogin=true
   }
  openSignUp(){
    this.showLogin=false
  }
}
