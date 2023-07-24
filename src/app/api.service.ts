import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public showCommentForm: boolean = true;
  public showCommentTable: boolean = false;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  postComment(comment:Comment) {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  getCommentsByFlightId(flightId: number): Observable<any[]> {
    const url = `${this.apiUrl}/comments/${flightId}`;
    return this.http.get<any[]>(url);
  }

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments`);
  }

  getCommentsByTag(tag: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/tag/${tag}`);
  }
  
}
