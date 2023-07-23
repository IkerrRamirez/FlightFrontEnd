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

  /*ngOnChanges(): void {
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
  }*/


  // onSubmit(): void {
  //   this.apiService.getCommentsByFlightId(this.flightId).subscribe(
  //     (comments) => {
  //       console.log('HOLA QUEM')
  //       this.searchedComments = comments;
  //     },
  //     (error) => {
  //       console.error('Error fetching comments:', error);
  //     }
  //   );
  // }
  
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
    this.selectedComment = null;
    this.searchedComments = this.allComments;

  }
}
