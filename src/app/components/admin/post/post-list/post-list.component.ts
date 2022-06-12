import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { PostType } from 'src/app/models/PostType';
import { CategoryPostType } from 'src/app/models/CategoryPostType';
import { CategoryPostService } from 'src/app/services/category-post.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PostType> |  null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<PostType> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  breadcrumb: string = "Bài Viết"
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
      sortFn: (a: PostType, b: PostType) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend', null],
      
    },
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: PostType, b: PostType) => a.id! - b.id! ,
      sortDirections: ['ascend', 'descend', null],
      search: true
      
    },
    {
      name: 'Title',
      sortOrder: null,
      sortFn: (a: PostType, b: PostType) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend', null],
     
    },
    {
      name: 'Image'
      
    },
    {
      name: 'Category',
      sortOrder: null,
      sortFn: (a: PostType, b: PostType) => a.categoryPostId - b.categoryPostId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [
        {text: "Công Nghệ", value: "Công Nghệ"},
        {text: "Tin Tức", value: "Tin Tức"},
      ],
      filterFn: (cateName: string, item: PostType) => item.categoriesPost?.name.indexOf(cateName) !== -1
      // filterFn: (cate: string, item: PostType) => item.categoriesPost?.indexOf(cate) !== -1
      // filterFn: (list: string[], item: PostType) => list.some(name => item.categoriesPost?.indexOf(name) !== -1)
    },
    {
      name: 'Short_desc'
     
    },
   
   
  ];
  

  constructor(
    private postService: PostService,
    private categoryPostService: CategoryPostService,
  ) { }

  ngOnInit(): void {
    this.getPostList()
    this.getCatePostList()
  }
  getPostList(){
    this.postService.getPost().subscribe(data=>{
      this.posts = data
      this.listOfData = data
      this.listOfDisplayData = [...this.listOfData];
      console.log(this.posts);
      console.log(this.listOfData);
      
    })
  }

  getCatePostList(){
    this.categoryPostService.getCatePost().subscribe((data)=>{
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
      this.postService.deletePost(id).subscribe(() => {
        this.getPostList()
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
    this.listOfDisplayData = this.listOfData.filter((item: PostType) => item.title.indexOf(this.searchValue) !== -1);
  }




}
