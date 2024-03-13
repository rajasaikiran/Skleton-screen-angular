import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http: HttpClient) { }

  public getData(): Observable<[]> {
    return this.http.get<[]>("https://jsonplaceholder.typicode.com/comments")
  }
}
