import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { PostType } from '../models/PostType';
import { Observable } from 'rxjs'

const url = `http://localhost:3001/posts`

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient ) { }


  getPost(): Observable<PostType[]> {
    return this.http.get<PostType[]>(`${url}?_expand=categoriesPost`)
  }
  
  getDetailPost(id: number | undefined): Observable<PostType> {
    return this.http.get<PostType>(`${url}/${id}?_expand=categoriesPost`)
  }

  
  addPost(data: PostType ): Observable<PostType>{
    return this.http.post<PostType>(url,data)
  }

  
  updatePost(data: PostType): Observable<PostType>{
    return this.http.put<PostType>(`${url}/${data.id}`,data)
  }

  
  deletePost(id: number | undefined): Observable<PostType>{
    return this.http.delete<PostType>(`${url}/${id}`)
  }
}
