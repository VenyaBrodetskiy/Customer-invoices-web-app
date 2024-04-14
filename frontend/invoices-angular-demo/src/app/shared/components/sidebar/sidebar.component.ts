import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'inv-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public console: any;

  constructor() {
    console = console;    
  }

}
