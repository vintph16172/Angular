import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductType } from 'src/app/models/ProductType';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  breadcrumb: string = "From Sản Phẩm"
  id: number | undefined
  product: ProductType = { name: "", price: 0, status: true, description: "" }
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if(this.id){
      this.productService.getDetailProduct(this.id).subscribe((data)=>{
        this.product = data
      })
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }


  onSubmit(){
    console.log(this.product);

    if(this.id){
      return this.productService.updateProduct(this.product).subscribe((data)=>{
        this.router.navigate([`/products`])        
      })
    }
    return this.productService.addProduct(this.product).subscribe((data)=>{
      this.router.navigate([`/products`])
    })
    
  }

}
