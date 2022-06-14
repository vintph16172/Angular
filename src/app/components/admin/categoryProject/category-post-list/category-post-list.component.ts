import { Component, OnInit } from '@angular/core';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { CategoryPostType } from 'src/app/models/CategoryPostType';
import { CategoryPostService } from 'src/app/services/category-post.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category-post-list',
  templateUrl: './category-post-list.component.html',
  styleUrls: ['./category-post-list.component.css']
})
export class CategoryPostListComponent implements OnInit {

  breadcrumb: string = "Danh Mục Bài Viết"
  posts: any
  catePost: any = {id: "",name: ""}
  cateFilter: any[] = []
  titles: any[] = []

  checked = false;
  indeterminate = false;
  listOfData: any 
  listOfCurrentPageData: [] = [];
  setOfCheckedId = new Set<number>();
  expandSet = new Set<number>();

  searchValue = '';
  visible = false;
  listOfDisplayData: any

  listOfColumns: any = [
    {
      name: 'STT',
      sortOrder: null,
      sortFn: (a: CategoryPostType, b: CategoryPostType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      
    },
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: CategoryPostType, b: CategoryPostType) => a.id! - b.id! ,
      sortDirections: ['ascend', 'descend', null],
      search: true
      
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: CategoryPostType, b: CategoryPostType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
     
    }
   
   
  ];
  

  constructor(
    private categoryPostService: CategoryPostService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getCategoryPostList()
    
  }
  getCategoryPostList(){
    this.categoryPostService.getCatePost().subscribe(data=>{
      this.posts = data
      this.listOfData = data
      this.listOfDisplayData = [...this.listOfData];
      console.log(this.posts);
      console.log(this.listOfData);
      
    })
  }

 

  onDelete(id: number | undefined) {
    if (confirm("Bạn có muốn Xóa?")) {
      this.categoryPostService.deleteCatePost(id).subscribe(() => {
        this.getCategoryPostList()
        this.message.success("Xóa Thành Công!")
      })
    }

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

  
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: CategoryPostType) => item.name.indexOf(this.searchValue) !== -1);
  }




}
