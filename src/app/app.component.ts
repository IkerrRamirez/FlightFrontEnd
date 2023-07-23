import { ApiService } from './api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from './models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flight-comments-frontend';
  comment!: Comment;
  comments: any[] = [];

  constructor(private router: Router, public apiService: ApiService) {}

  onFlightButtonClick(): void {
    this.apiService.showCommentForm = true;
    this.apiService.showCommentTable = false;
  }

  onSearchPerformed(): void {
    this.apiService.showCommentForm = false;
    this.apiService.showCommentTable = true;
  }

  flightId: number | undefined;

  onFlightSelected(flightId: number): void {
    this.flightId = flightId;
    this.apiService.getCommentsByFlightId(this.flightId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
}
