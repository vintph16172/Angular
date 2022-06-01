import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { Observable } from 'rxjs'
import { UserType } from '../models/UserType';

const url = `http://localhost:3001/users`
interface User{
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signup(inputData: User): Observable<UserType> {
    return this.http.post<UserType>(`${url}/signup`,inputData)
  }

  signin(inputData: User): Observable<UserType> {
    return this.http.post<UserType>(`${url}/signin`,inputData)
  }
}
