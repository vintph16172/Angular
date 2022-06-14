import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryPostService } from 'src/app/services/category-post.service';
import { CategoryPostType } from 'src/app/models/CategoryPostType';


@Component({
  selector: 'app-category-post-form',
  templateUrl: './category-post-form.component.html',
  styleUrls: ['./category-post-form.component.css']
})
export class CategoryPostFormComponent implements OnInit {

  breadcrumb: string = "Form Bài Viết"
  id: number | undefined
  isImgLoad: boolean = false
  product: CategoryPostType = {
    name: ""
  }
  categoryPost: any
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryPostService: CategoryPostService,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.categoryPostService.getCateDetailPost(this.id).subscribe((data) => {
        this.product = data
        this.isImgLoad = true
        console.log( this.product);
        
      })
    }
  
    
  }



  onSubmit() {
    console.log(this.product);
    console.log(this.product);
    if (this.id) {
      return this.categoryPostService.updateCatePost(this.product).subscribe((data) => {
        this.router.navigate([`/admin/categoryPosts`])
      })
    }
    
    return this.categoryPostService.addCatePost(this.product).subscribe((data) => {
      this.router.navigate([`/admin/categoryPosts`])
    })

  }

  
  

}
