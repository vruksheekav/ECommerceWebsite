import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(): void {
  this.activeRoute.params.subscribe(params => {
    const query = params['query'];
    if (query) {
      const lowerQuery = query.toLowerCase();
      this.product.searchProduct(query).subscribe((result) => {
        this.searchResult = result.filter(item =>
          item.name?.toLowerCase().includes(lowerQuery) ||
          item.category?.toLowerCase().includes(lowerQuery) ||
          item.color?.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery) ||
          String(item.price).toLowerCase().includes(lowerQuery)
        );
      });
    }
  });
}

}
