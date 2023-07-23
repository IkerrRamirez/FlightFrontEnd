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
  showTable: Boolean = false;

  @Output() flightSelected = new EventEmitter<number>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.getCommentsByFlightId();
  }

  ngOnChanges(): void {
    this.getCommentsByFlightId();
  }

  getCommentsByFlightId(): void {
    if (this.flightId !== undefined) {
      this.apiService.getCommentsByFlightId(this.flightId).subscribe(
        (comments) => {
          this.comments = comments;
          this.showTable = true;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }

}
