import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'inv-loading-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent {
  constructor(public loadingService: LoadingService) { }
}
