import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'inv-loading-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent implements AfterViewInit, OnDestroy {
  public isLoading$ = this.loadingService.isLoading$;
  private subscription: Subscription | undefined;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef) { 
  }
  
  ngAfterViewInit(): void {
    this.subscription = this.loadingService.isLoading$.subscribe(() => {
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
}
