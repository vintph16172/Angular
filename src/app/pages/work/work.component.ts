import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  project: any

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getProject()
  }

  getProject(){
    this.projectService.getProject().subscribe(data=>{
      this.project = data
      console.log(this.project);
      
    })
  }

}
