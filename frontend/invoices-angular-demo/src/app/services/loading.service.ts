import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading = this.loadingSubject.asObservable();
  private activeRequests = 0;

  constructor() { }

  public setLoadingOn() {
    if (this.activeRequests === 0) {
      console.log('Loading ON');
      this.loadingSubject.next(true);
    }
    this.activeRequests++;
  }

  public setLoadingOff() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      console.log('Loading OFF');
      this.loadingSubject.next(false);
    }
    if (this.activeRequests <= 0) this.activeRequests = 0;
  }
}
