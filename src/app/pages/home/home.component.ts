import { Component, OnInit } from '@angular/core';
import { UserProfileType } from 'src/app/models/UserProfile';
import { PostService } from 'src/app/services/post.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile: any
  post: any
  project: any

  constructor(
    private userProfileService: UserProfileService,
    private postService: PostService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getUserProfile()
    this.getPost()
    this.getProject()
  }

  getUserProfile(){
    this.userProfileService.getUserProfile().subscribe(data=>{
      this.userProfile = data
      console.log(this.userProfile);
      
    })
  }

  getPost(){
    this.postService.getPost().subscribe(data=>{
      const element = [];
      for (let index = 1; index <= 2; index++) {
        element.push(data[data.length - index])
      }
      this.post = element
      console.log(this.post);
    })
  }

  getProject(){
    this.projectService.getProject().subscribe(data=>{
      const element = [];
      for (let index = 1; index <= 3; index++) {
        element.push(data[data.length - index])
      }
      this.project = element
      console.log(this.project);
    })
  }

  downloadCV(abc: any){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', abc);
    link.setAttribute('download', `vintph16172.pdf`);
    document.body.appendChild(link);
    console.log(this.project.cv);
    
    link.click();
    link.remove();
}

}
