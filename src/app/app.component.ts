import { Component } from '@angular/core';
import { IProduct } from './models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productList: IProduct[] = [
    {
      id: 1,
      name: "product A",
      price: 200,
      status: false
    },
    {
      id: 2,
      name: "product B",
      price: 300,
      status: true
    }
  ]
  // onHandleClick() {
  //   this.productStatus = !this.productStatus
  // }
  // onHandleDelete(id: number) {
  //   console.log(id);
  //   this.productList = this.productList.filter(product => product.id !== id);
  // }

  // onHandleKeyPress(event: any) {
  //   console.log(event.target.value);
  //   this.title = event.target.value;
  // }
  // onSubmit() {
  //   console.log('1')
  // }
  // onHandleGetInfo(product: IProduct) {
  //   this.productDetail = product;
  //   console.log('product', product)
  // }
}

/* 
  productList.map(item => (
    <div>

    </div>
  ))
*/