import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  popularProducts: product[] | undefined;
  trendyProducts: product[] | undefined;

  @ViewChild('carouselContainer', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  private rafId = 0;
  private singleSetWidth = 0;

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProducts = data;

      setTimeout(() => {
        this.duplicateCardsForLoop();
        this.startAutoScroll();
      }, 0);
    });

    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }

  duplicateCardsForLoop(): void {
    const container = this.carousel.nativeElement;
    const cards = container.querySelectorAll('.product-card');

    // Clone the existing cards and append them to the container
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      container.appendChild(clone);
    });

    this.singleSetWidth = container.scrollWidth / 2;
  }

  startAutoScroll(): void {
    const container = this.carousel.nativeElement;
    const speed = 1; // px per frame

    const animate = () => {
      container.scrollLeft += speed;

      if (container.scrollLeft >= this.singleSetWidth) {
        container.scrollLeft -= this.singleSetWidth;
      }

      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
}
