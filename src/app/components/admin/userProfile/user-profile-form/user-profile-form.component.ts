import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileType } from 'src/app/models/UserProfile';
import { UserProfileService } from 'src/app/services/user-profile.service';
import axios from 'axios';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit {

  breadcrumb: string = "Form Thông Tin"
  id: number | undefined
  isImgLoad: boolean = false
  product: UserProfileType = {
    name: "",
    position: "",
    about: "",
    cv: ""
  }
  categoryPost: any
  validateForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.userProfileService.getDetailUserProfile(this.id).subscribe((data) => {
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
      return this.userProfileService.updateUserProfile(this.product).subscribe((data) => {
        this.router.navigate([`/admin/userProfile/edit/1`])
        this.message.success("Sửa Thành Công!")
      })
    }
    
    return this.userProfileService.addUserProfile(this.product).subscribe((data) => {
      this.router.navigate([`/admin/userProfile/edit/1`])
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
        
        this.product.cv = data.url;
        this.isImgLoad = true
        console.log(this.product);
      }
    };
  }
}
