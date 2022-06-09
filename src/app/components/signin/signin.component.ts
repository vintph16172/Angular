import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }  

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.userService.signin(this.validateForm.value).subscribe(
        data => {
          console.log(data, "data");
          alert("Đăng nhập thành công!")
          localStorage.setItem("user",JSON.stringify(data))
          setTimeout(()=>{
            if(JSON.parse(localStorage.getItem('user')!).user.role == 2){
              this.router.navigateByUrl(`/admin/products/list`)
              console.log("admin");
              
            }else{
              this.router.navigateByUrl(``)
              console.log("user");
            }
            
          },2000)
        }

      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
