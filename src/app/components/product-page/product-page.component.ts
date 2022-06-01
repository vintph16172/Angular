import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from 'src/app/models/ProductType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  search: string | null = ""
  products: ProductType[] = []

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.search = this.activatedRoute.snapshot.paramMap.get("search")
    if(this.search){
      this.productService.searchProduct(this.search).subscribe((data)=>{
        this.products = data
      })
    }else{
      this.productService.getProduct().subscribe((data)=>{
        this.products = data
      })
    }

  }




}
