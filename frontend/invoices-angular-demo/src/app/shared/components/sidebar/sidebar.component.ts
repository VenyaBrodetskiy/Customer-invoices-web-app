import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { States } from '../../../constants';

@Component({
  selector: 'inv-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public console: any;
  public States = States;

  constructor() {
    console = console;    
  }

}
