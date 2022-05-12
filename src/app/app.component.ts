import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sum22';
  productName: string = "Product A";
  productPrice: number = 10;
  productStatus: boolean = false;
  productInfo: { id: number, price: number, name: string } = {
    id: 1,
    name: "product A",
    price: 200
  };

  productList: { id: number, price: number, name: string, status: boolean }[] = [
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
  onHandleClick() {
    this.productStatus = !this.productStatus
  }
  onHandleDelete(id: number) {
    console.log(id);
    this.productList = this.productList.filter(product => product.id !== id);
  }

  onHandleKeyPress(event: any) {
    console.log(event.target.value);
    this.title = event.target.value;
  }
  onSubmit() {
    console.log('1')
  }
}

/* 
  productList.map(item => (
    <div>

    </div>
  ))
*/