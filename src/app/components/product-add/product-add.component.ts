import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ProductType } from 'src/app/models/ProductType';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  @Output() onAdd = new EventEmitter()
  id: number | undefined
  breadcrumb: string = "Thêm Sản Phẩm"
  addProduct: ProductType = { name: "", price: 0, status: true, description: "" }

  // AddProductForm = this.formBuilder.group({
  //   id: 100,
  //   name: "",
  //   price: "",
  //   status: true,
  //   description: ""
  // })

  // onHandlerSubmit(){
  //   console.log('abc', this.AddProductForm.value);
  //   this.AddProductForm.reset();
  // }

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.addProduct);
    // this.onAdd.emit(this.addProduct)
    this.productService.addProduct(this.addProduct).subscribe((data) => {
      console.log(data)
      this.router.navigate([`/products`])
    })
  }

}
