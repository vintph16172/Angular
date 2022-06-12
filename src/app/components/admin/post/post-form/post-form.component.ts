import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostType } from 'src/app/models/PostType';
import { PostService } from 'src/app/services/post.service';
import axios from 'axios';
import * as moment from 'moment';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  // public Editor = ClassicEditor;
  breadcrumb: string = "From Bài Viết"
  id: number | undefined

  product: PostType = {
    title: "",
    image: "",
    createAt: "",
    categoryPostId: 0,
    short_desc: "",
    desc: ""
  }
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.postService.getDetailPost(this.id).subscribe((data) => {
        this.product = data
      })
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }



  onSubmit() {
    this.product.createAt = moment().toISOString();
    console.log(this.product);

    // if (this.id) {
    //   return this.postService.updatePost(this.product).subscribe((data) => {
    //     this.router.navigate([`/products`])
    //   })
    // }
    // return this.postService.addPost(this.product).subscribe((data) => {
    //   this.router.navigate([`/products`])
    // })

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
        console.log(this.product);
      }
    };
  }

}
