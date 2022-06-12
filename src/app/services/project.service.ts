import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs'
import { ProjectType } from '../models/ProjectType';

const url = `http://localhost:3001/projects`

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient ) { }


  getProject(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(`${url}?_expand=categoriesProject`)
  }
  
  getDetailProject(id: number | undefined): Observable<ProjectType> {
    return this.http.get<ProjectType>(`${url}/${id}?_expand=categoriesProject`)
  }

  
  addProject(data: ProjectType ): Observable<ProjectType>{
    return this.http.post<ProjectType>(url,data)
  }

  
  updateProject(data: ProjectType): Observable<ProjectType>{
    return this.http.put<ProjectType>(`${url}/${data.id}`,data)
  }

  
  deleteProject(id: number | undefined): Observable<ProjectType>{
    return this.http.delete<ProjectType>(`${url}/${id}`)
  }
}
