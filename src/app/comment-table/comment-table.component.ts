import { ApiService } from './../api.service';
import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.css']
})
export class CommentTableComponent implements OnInit, OnChanges {
  @Input() flightId: number | undefined;
  comments: any[] = [];

  @Output() flightSelected = new EventEmitter<number>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCommentsByFlightId();
  }

  ngOnChanges(): void {
    this.getCommentsByFlightId();
  }

  getCommentsByFlightId(): void {
    if (this.flightId !== undefined) {
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

}
