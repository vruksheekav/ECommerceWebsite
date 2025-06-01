import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  popularProducts:undefined | product[]
  trendyProducts:undefined | product[]
item: any;

  constructor(private product:ProductService){}

  ngOnInit(): void {
      this.product.popularProducts().subscribe((data)=>{
        console.warn(data);
        this.popularProducts=data;
      });
      this.product.trendyProducts().subscribe((data)=>{
        this.trendyProducts=data;
      });
  }

}
