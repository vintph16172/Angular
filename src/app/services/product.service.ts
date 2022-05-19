import { Injectable } from '@angular/core';
import mockData from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(id: number) {
    return mockData.find(item => item.id == +id)!;
  }
  getProducts() {
    return mockData;
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
