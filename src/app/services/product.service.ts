import { Injectable } from '@angular/core';
import mockData from 'src/data';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProduct(id: number) {
    return this.http.get(`${this.API_URL}/${id}`)
  }
  getProducts() {
    return this.http.get(this.API_URL)
  }
  removeProduct() {
    // mockData.filter()
  }
  addProduct(product: any) {
    mockData.push(product);
  }
  updateProduct() {

  }
}
/**
 * 1. Import module "HttpClientModule" vào file app.module.ts
 * 2. Import service "HttpClient" vào product.service.ts
 * 3. Inject service http vào product service
 */