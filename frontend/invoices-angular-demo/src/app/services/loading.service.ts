import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading = this.loadingSubject.asObservable();

  constructor() { }

  public setLoadingOn() {
    console.log('Loading ON');
    this.loadingSubject.next(true);
  }

  public setLoadingOff() {
    console.log('Loading OFF');
    this.loadingSubject.next(false);
  }
}
