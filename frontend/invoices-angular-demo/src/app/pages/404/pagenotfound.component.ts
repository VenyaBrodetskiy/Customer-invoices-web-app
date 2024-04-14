import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'inv-pagenotfound',
  standalone: true,
  imports: [],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PageNotFoundComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
