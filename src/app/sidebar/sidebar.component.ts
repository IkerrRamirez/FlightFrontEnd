import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  flights: any[] = [];
  flightId: number | undefined;

  @Output() flightSelected: EventEmitter<number> = new EventEmitter<number>();
  comments: any[] | undefined;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getFlights();
  }

  Post() {
    this.router.navigate(["comment-form"]);
  }

  Get() {
    this.router.navigate(["comment-table"]);
  }

  search() {
    this.router.navigate(["comment-table"]);
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


  onSubmit(): void {
    if (this.flightId !== undefined) {
      this.flightSelected.emit(this.flightId);
    }
  }
}
