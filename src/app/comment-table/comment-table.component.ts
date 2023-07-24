import * as moment from 'moment-timezone';
import { ApiService } from './../api.service';
import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.css']
})
export class CommentTableComponent implements OnInit {
  flightId: any;

  allComments: any[] = [];
  selectedComment: any = null;
  searchedComments: any[] = [];

  filterType: string = 'flightId'; // Valor predeterminado del filtro
  tagFilter: string = '';

  showTable: Boolean = false;

  @Output() flightSelected = new EventEmitter<number>();
  comment: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFlights().subscribe(
      (allComments) => {
        this.allComments = allComments;
        this.searchedComments = allComments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  onSelectItem(comment: any) {
    this.selectedComment = comment;
  }

  
  
  onSubmit(): void {
    if (this.filterType === 'flightId') {
      // search by FlightId
      this.apiService.getCommentsByFlightId(this.flightId).subscribe(
        (comments) => {
          this.searchedComments = comments;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    } else if (this.filterType === 'tag') {
      // search by Tag
      this.apiService.getCommentsByTag(this.tagFilter).subscribe(
        (comments) => {
          this.searchedComments = comments;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }


  showAllComents() {
    this.flightId = '';
    this.tagFilter = '';
    this.selectedComment = null;
    this.searchedComments = this.allComments;

  }

  formatDate(date: string): string {
    return moment.utc(date).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');
  }
}
