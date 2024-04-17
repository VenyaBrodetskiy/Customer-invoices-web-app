import { Component } from '@angular/core';
import { States } from '../../constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'inv-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public States = States
}
