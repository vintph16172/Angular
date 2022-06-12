import { Component, OnInit } from '@angular/core';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ProjectType } from 'src/app/models/ProjectType';
import { CategoryProjectService } from 'src/app/services/category-project.service';
import { ProjectService } from 'src/app/services/project.service';

import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  breadcrumb: string = "Dự Án"
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
      sortFn: (a: ProjectType, b: ProjectType) => a.id! - b.id!,
      sortDirections: ['ascend', 'descend', null],
      
    },
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: ProjectType, b: ProjectType) => a.id! - b.id! ,
      sortDirections: ['ascend', 'descend', null],
      search: true
      
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: ProjectType, b: ProjectType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
     
    },
    {
      name: 'Image'
      
    },
    {
      name: 'Category',
      sortOrder: null,
      sortFn: (a: ProjectType, b: ProjectType) => a.categoriesProjectId - b.categoriesProjectId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [
        {text: "Công Nghệ", value: "Công Nghệ"},
        {text: "Tin Tức", value: "Tin Tức"},
      ],
      filterFn: (cateName: string, item: ProjectType) => item.categoriesProject?.name.indexOf(cateName) !== -1
      // filterFn: (cate: string, item: ProjectType) => item.categoriesPost?.indexOf(cate) !== -1
      // filterFn: (list: string[], item: ProjectType) => list.some(name => item.categoriesPost?.indexOf(name) !== -1)
    },
    {
      name: 'Short_desc'
     
    },
   
   
  ];
  

  constructor(
    private projectService: ProjectService,
    private categoryProjectService: CategoryProjectService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getProjectList()
    this.getCateProjectList()
  }
  getProjectList(){
    this.projectService.getProject().subscribe(data=>{
      this.posts = data
      this.listOfData = data
      this.listOfDisplayData = [...this.listOfData];
      console.log(this.posts);
      console.log(this.listOfData);
      
    })
  }

  getCateProjectList(){
    this.categoryProjectService.getCateProject().subscribe((data)=>{
      this.catePost = data
      this.cateFilter = this.catePost.map((data:any)=>{
        return {text: data.name,value: data.name}
      })
      for (let index = 0; index < data.length; index++) {
        this.titles.push({
          text: data[index]['name'],
          value: data[index]['name'],
        })
        
      }
     
      console.log(this.catePost);
      console.log(this.cateFilter);
      console.log(this.titles);
      
    })
  }

  onDelete(id: number | undefined) {
    if (confirm("Bạn có muốn Xóa?")) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.getProjectList()
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
    this.listOfDisplayData = this.listOfData.filter((item: ProjectType) => item.name.indexOf(this.searchValue) !== -1);
  }

}
