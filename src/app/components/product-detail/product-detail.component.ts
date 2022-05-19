import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: IProduct;

  constructor(private router: ActivatedRoute) {
    const id = this.router.snapshot.paramMap.get('id');
    // this.product = Array.find(item => item.id === id);
  }

  ngOnInit(): void {
  }


}
