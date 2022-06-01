import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductType } from 'src/app/models/ProductType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  breadcrumb: string = "Sửa Sản Phẩm"
  id: number | undefined
  editProduct: ProductType = { name: "", price: 0, status: true, description: "" }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.productService.getDetailProduct(this.id).subscribe((data)=>{
      this.editProduct = data
    })
  }

  onSubmit(){
    console.log(this.editProduct);
    this.productService.updateProduct(this.editProduct).subscribe((data)=>{
      console.log(data);
      this.router.navigate([`/products`])
    })
    
  }

}
