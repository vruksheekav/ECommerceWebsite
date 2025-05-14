import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';
import { SellerService } from './services/seller.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'newstandalone';
  showHeader = true;

  constructor(private router: Router, private sellerService: SellerService) {  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/seller-auth'];
        this.showHeader = !hiddenRoutes.some(route => event.url.startsWith(route));
      }
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   this.sellerService.reloadSeller();  // ✅ Restore session on app load
  // }
}
