import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  flights: any[] = []; // Agrega esta propiedad para almacenar la lista de vuelos
  flightId: number | undefined;

  @Output() flightSelected: EventEmitter<number> = new EventEmitter<number>();
  comments: any[] | undefined;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getFlights();
  }

  showCommentForm: Boolean = true;

  Post() {
    this.router.navigate(["comment-form"]);
  }

  Get() {
    this.router.navigate(["comment-table"]);
  }

  search() {
    this.router.navigate(["comment-table"]);
  }

  onSearch(): void {
    if (this.flightId !== undefined) {
      this.apiService.getCommentsByFlightId(this.flightId).subscribe(
        (comments) => {
          this.comments = comments;
          this.apiService.showCommentForm = false;
          this.apiService.showCommentTable = true;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }

  getFlights(): void {
    this.apiService.getFlights().subscribe(
      (flights) => {
        this.flights = flights;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  onFlightClick(flightId: number): void {
    this.flightId = flightId;
    this.flightSelected.emit(this.flightId);
  }

  onSubmit(): void {
    if (this.flightId !== undefined) {
      this.flightSelected.emit(this.flightId);
      this.showCommentForm = false;
    }
  }
}
