import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'inv-loading-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent implements AfterViewInit{
  public isLoading$ = this.loadingService.isLoading$;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef) { 
  }
  
  ngAfterViewInit(): void {
    this.loadingService.isLoading$.subscribe(() => {
      this.cdr.detectChanges();
    })
  }
  
}
