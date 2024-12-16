import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { productInter } from '../../core/interfaces/productInter';

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
  pages: number = 1;
  currPage: number = 0;

  ngOnInit(): void {
    this.loadProducts(this.skip);

    this.productsService.totalResponse.subscribe((res) => {
      this.total = res;
    });

  }

  ngAfterViewInit(): void {
    this.productsService.pageSubject.subscribe((res) => {
      this.pages = res;
    });
  }

  loadProducts(skip: number) {
    this.productsService.loadProducts(this.limit, skip).subscribe((res) => {
      this.products = res;
    });
  }

  pageLogic(value: number) {
    this.currPage = value
    let nextPage = value * this.limit;
    this.loadProducts(nextPage);
  }

  // loadNextPage() {
  //   this.skip += this.limit;
  //   this.loadProducts(this.skip);
  // }

  // loadPervPage() {
  //   this.skip -= this.limit;
  //   this.loadProducts(this.skip);
  // }
}
