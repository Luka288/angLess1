import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { productInter } from '../../core/interfaces/productInter';
import { combineLatest, tap } from 'rxjs';

@Component({
  selector: 'app-pagination-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-task.component.html',
  styleUrl: './pagination-task.component.scss',
})
export class PaginationTaskComponent implements OnInit {
  productsService = inject(ProductService);

  products: productInter[] = [];

  limit: number = 5;
  skip: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.loadProducts(this.skip);

    this.productsService.totalResponse.subscribe((res) => {
      this.total = res;
    });
  }

  loadProducts(skip: number) {
    this.productsService.loadProducts(this.limit, skip).subscribe((res) => {
      this.products = res;
    });
  }

  loadNextPage() {
    this.skip += this.limit;
    this.loadProducts(this.skip);
  }

  loadPervPage() {
    this.skip -= this.limit;
    this.loadProducts(this.skip);
  }
}
