import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryProjectType } from 'src/app/models/CategoryProjectType';
import { CategoryProjectService } from 'src/app/services/category-project.service';

@Component({
  selector: 'app-category-projects-list',
  templateUrl: './category-projects-list.component.html',
  styleUrls: ['./category-projects-list.component.css']
})
export class CategoryProjectsListComponent implements OnInit {

  breadcrumb: string = "Danh Mục Dự Án"
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
      sortFn: (a: CategoryProjectType, b: CategoryProjectType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      
    },
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: CategoryProjectType, b: CategoryProjectType) => a.id! - b.id! ,
      sortDirections: ['ascend', 'descend', null],
      search: true
      
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: CategoryProjectType, b: CategoryProjectType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
     
    }
   
   
  ];
  

  constructor(
    private categoryProjectService: CategoryProjectService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getCategoryProjectList()
    
  }
  getCategoryProjectList(){
    this.categoryProjectService.getCateProject().subscribe(data=>{
      this.posts = data
      this.listOfData = data
      this.listOfDisplayData = [...this.listOfData];
      console.log(this.posts);
      console.log(this.listOfData);
      
    })
  }

 

  onDelete(id: number | undefined) {
    if (confirm("Bạn có muốn Xóa?")) {
      this.categoryProjectService.deleteCateProject(id).subscribe(() => {
        this.getCategoryProjectList()
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
    this.listOfDisplayData = this.listOfData.filter((item: CategoryProjectType) => item.name.indexOf(this.searchValue) !== -1);
  }

}
