import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {
  project: any
  id: number | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    if (this.id) {
      this.projectService.getDetailProject(this.id).subscribe((data) => {
        this.project = data
        
        console.log( this.project);
        
      })
    }
  }

  

}
