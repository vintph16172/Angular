import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/ProductType';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit {
  title: string = "abc"
  breadcrumb: string = "Sản Phẩm"
  testInput: string = "myName"
  show: boolean = true
  products: any

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: any 
  listOfCurrentPageData: [] = [];
  setOfCheckedId = new Set<number>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.onGetProduct()
  }

  onGetProduct() {
    this.productService.getProduct().subscribe((data) => {
      this.products = data
      this.listOfData = data
      console.log(this.listOfData);
      
    })
  }

  onDelete(id: number | undefined) {
    if (confirm("Bạn có muốn Xóa?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.onGetProduct()
      })
    }

  }

  onHandlerClick() {
    this.show = !this.show
  }

  // onHandlerDelete(id: number | undefined ){
  //   if(confirm("Bạn Có Muốn Xóa?")){
  //     this.products = this.products.filter(item => item.id !== id )
  //   }

  // }

  onHandlerAdd(data: ProductType) {
    data.id = 1

    console.log(data);
    // this.products.push(data)

  }

  onHandlerKeyPress(event: any) {
    console.log(event.target.value);
    this.title = event.target.value

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: any): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  // sendRequest(): void {
  //   this.loading = true;
  //   const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
  //   console.log(requestData);
  //   setTimeout(() => {
  //     this.setOfCheckedId.clear();
  //     this.refreshCheckedStatus();
  //     this.loading = false;
  //   }, 1000);
  // }



}
