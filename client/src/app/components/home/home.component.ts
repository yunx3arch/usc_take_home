import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-home',
  standalone: true, // Declare as standalone
  imports: [CommonModule], // Import necessary modules directly
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboardData: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.http.get('http://localhost:5001/api/protected/dashboard', {
        headers: { Authorization: `Bearer ${authToken}` }
      }).subscribe({
        next: (data) => {
          this.dashboardData = data;
        },
        error: (err) => {
          console.error('Error fetching dashboard data', err);
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }
        }
      });
    } else {
      console.error('No auth token found');
      this.router.navigate(['/login']);
    }
  }
}
