import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:signUp){
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
      }
    })
  }
  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe: 'response'})
    .subscribe((result)=>{
     if(result && result.body?.length){
       this.invalidUserAuth.emit(false)
       localStorage.setItem('user',JSON.stringify(result.body[0]))
       this.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
     }else{
      this.invalidUserAuth.emit(true)
     }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
        this.isUserLoggedIn.next(true); 
      this.router.navigate(['/home']);
    }
  }
}
