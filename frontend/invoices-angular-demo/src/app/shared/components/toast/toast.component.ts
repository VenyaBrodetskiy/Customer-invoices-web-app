import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'inv-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private subscription: Subscription | undefined;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscription = this.toastService.getToastMessage().subscribe(message => {
      this.messages.push(message);
      setTimeout(() => this.messages.shift(), 3000);
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
