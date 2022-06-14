import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs'
import { UserProfileType } from '../models/UserProfile';


const url = `http://localhost:3001/user`


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient ) { }


  getUserProfile(): Observable<UserProfileType[]> {
    return this.http.get<UserProfileType[]>(`${url}`)
  }
  
  getDetailUserProfile(id: number | undefined): Observable<UserProfileType> {
    return this.http.get<UserProfileType>(`${url}`)
  }

  
  addUserProfile(data: UserProfileType ): Observable<UserProfileType>{
    return this.http.post<UserProfileType>(url,data)
  }

  
  updateUserProfile(data: UserProfileType): Observable<UserProfileType>{
    return this.http.put<UserProfileType>(`${url}`,data)
  }

  
  
}
