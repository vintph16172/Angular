import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryProjectType } from '../../../../models/CategoryProjectType';
import { CategoryProjectService } from '../../../../services/category-project.service';


@Component({
  selector: 'app-category-projects-form',
  templateUrl: './category-projects-form.component.html',
  styleUrls: ['./category-projects-form.component.css']
})
export class CategoryProjectsFormComponent implements OnInit {

  breadcrumb: string = "Form Dự Án"
  id: number | undefined
 
  product: CategoryProjectType = {
    name: ""
  }
  categoryPost: any
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryProjectService: CategoryProjectService,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.categoryProjectService.getCateDetailProject(this.id).subscribe((data) => {
        this.product = data
        console.log( this.product);
        
      })
    }
  
    
  }



  onSubmit() {
    console.log(this.product);
    console.log(this.product);
    if (this.id) {
      return this.categoryProjectService.updateCateProject(this.product).subscribe((data) => {
        this.router.navigate([`/admin/categoryProjects`])
      })
    }
    
    return this.categoryProjectService.addCateProject(this.product).subscribe((data) => {
      this.router.navigate([`/admin/categoryProjects`])
    })

  }
}
