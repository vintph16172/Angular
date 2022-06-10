import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  
  
  constructor() { }

  ngOnInit(): void {
    console.log(moment());
    console.log(moment().format());
    console.log(moment().unix());
    console.log(moment().toISOString());
    const time = moment()
    console.log(time.format("D MMM YYYY"));
    
  }

}
