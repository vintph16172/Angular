import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: { name: string, price: number } = {
    name: "",
    price: 0
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.productService.addProduct(this.product);
  }
}
