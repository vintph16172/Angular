import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  breadcrumb: string = "Sản Phẩm"
  posts: any

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: any 
  listOfCurrentPageData: [] = [];
  setOfCheckedId = new Set<number>();
  expandSet = new Set<number>();

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getPostList()
  }
  getPostList(){
    this.postService.getPost().subscribe(data=>{
      this.posts = data
      this.listOfData = data
      console.log(this.posts);
      
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




}
