import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  title: string = "Blog"
  posts: any
  
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    console.log(moment());
    console.log(moment().format());
    console.log(moment().unix());
    console.log(moment().toISOString());
    const time = moment()
    console.log(time.format("D MMM YYYY"),"abc");

    this.onGetPost()
  }

  onGetPost() {
    this.postService.getPost().subscribe((data) => {

      this.posts = data
      // .forEach(data2=>{
        
      //   data2.createAt = moment(data2.createAt,"D MMM YYYY")
      // })
      console.log(this.posts);
      const abc = moment(data[0].createAt,"D MMM YYYY")
      
      console.log(abc);
      
      
      
    })
  }

}
