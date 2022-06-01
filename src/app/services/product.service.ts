import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { ProductType } from '../models/ProductType';
import { Observable } from 'rxjs'

const url = `http://localhost:3001/products`

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient ) { }

  searchProduct(searchInput: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${url}?name_like=${searchInput}`)
  }

  getProduct(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(url)
  }
  
  getDetailProduct(id: number | undefined): Observable<ProductType> {
    return this.http.get<ProductType>(`${url}/${id}`)
  }

  
  addProduct(data: ProductType ): Observable<ProductType>{
    return this.http.post<ProductType>(url,data)
  }

  
  updateProduct(data: ProductType): Observable<ProductType>{
    return this.http.put<ProductType>(`${url}/${data.id}`,data)
  }

  
  deleteProduct(id: number | undefined): Observable<ProductType>{
    return this.http.delete<ProductType>(`${url}/${id}`)
  }

}


