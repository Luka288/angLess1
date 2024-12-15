import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseAPI } from '../consts/consts';
import { jsonProducts } from '../interfaces/productInter';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  pageSubject = new BehaviorSubject<number>(1);
  totalResponse = new BehaviorSubject<number>(0);

  loadProducts(limit: number, skip: number) {
    return this.http
      .get<jsonProducts>(`${baseAPI}/products?limit=${limit}&skip=${skip}`)
      .pipe(
        tap((res) => {
          let pages = Math.floor(res.total / res.limit);
          this.pageSubject.next(pages);
          // this.totalResponse.next(res.total);
        }),
        map((res) => res.products)
      );
  }
}
