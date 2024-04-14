import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
