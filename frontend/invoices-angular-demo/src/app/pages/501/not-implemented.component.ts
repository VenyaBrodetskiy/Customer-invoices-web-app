import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'inv-not-implemented',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-implemented.component.html',
  styleUrl: './not-implemented.component.css'
})
export class NotImplementedComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
