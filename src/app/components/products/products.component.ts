import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/Product';
import { ProductService } from '../../services/product.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList!: IProduct[];
  constructor(private productService: ProductService) {
    this.showProducts();
  }

  ngOnInit(): void {
  }

  showProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productList = data
    })
  }
  onRemoveItem(id: number) {
    // call api xoa
    this.productService.removeProduct(id).subscribe(() => {
      // reRender
      this.productList = this.productList.filter(item => item.id !== id);
    });
  }

}
// /product -> list
// /product/:id -> detail
