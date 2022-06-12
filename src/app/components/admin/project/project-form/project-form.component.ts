import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import axios from 'axios';
import * as moment from 'moment';
import { ProjectType } from 'src/app/models/ProjectType';
import { ProjectService } from 'src/app/services/project.service';
import { CategoryProjectService } from 'src/app/services/category-project.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  breadcrumb: string = "Form Dự Án"
  id: number | undefined
  isImgLoad: boolean = false
  product: ProjectType = {
    name: "",
    image: "",
    createAt: "",
    categoriesProjectId: 0,
    short_desc: "",
    desc: ""
  }
  categoryPost: any
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private categoryProjectService: CategoryProjectService,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.projectService.getDetailProject(this.id).subscribe((data) => {
        const { categoriesProject, ...abc } = data;
        this.product = abc
        this.isImgLoad = true
        console.log( this.product);
        
      })
    }
    this.categoryProjectService.getCateProject().subscribe((data2)=>{
      this.categoryPost = data2
      console.log(this.categoryPost);
      
    })
    
  }



  onSubmit() {
    console.log(this.product);
    if (this.id) {
      return this.projectService.updateProject(this.product).subscribe((data) => {
        this.router.navigate([`/admin/projects`])
      })
    }
    this.product.createAt = moment().toISOString();
    console.log(this.product);
    return this.projectService.addProject(this.product).subscribe((data) => {
      this.router.navigate([`/admin/projects`])
    })

  }

  async changeListener(files: any) {
    let fileList2 = files.target.files[0];
    console.log(fileList2);
    if (fileList2) {
      let file: File = fileList2;
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);

      if (file) {
        const CLOUDINARY_PRESET = "iqnyfok8";
        const CLOUDINARY_API_URL =
          "https://api.cloudinary.com/v1_1/vintph16172/image/upload"

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
          headers: {
            "Content-Type": "application/form-data"
          }
        });
        console.log(data);
        
        this.product.image = data.url;
        this.isImgLoad = true
        console.log(this.product);
      }
    };
  }

}
