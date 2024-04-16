import { DatePipe, Location, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { InvoiceStateService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'inv-invoice-detail',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  
  invoiceForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    dateIssued: new FormControl('', Validators.required),
  });

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private invoiceService: InvoiceStateService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => this.invoiceService.getById(id)),
        takeUntil(this.unsubscribe$))
      .subscribe(invoice => {
        invoice && this.invoiceForm.patchValue({
          ...invoice,
          dateIssued: formatDate(invoice.dateIssued, 'yyyy-MM-dd', 'en-US')
        }, { emitEvent: false })
      });

    this.invoiceForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => { this.updateInvoice() }
      })
  }

  updateInvoice() {
    const invoiceId = this.invoiceForm.get('id')?.value;
    if (!invoiceId) return;

    console.log(`Updating invoice N:${invoiceId} to ${JSON.stringify(this.invoiceForm.value)}`);
    
    const updatedInvoice: Invoice = {
      id: this.invoiceForm.value.id ?? 0,
      name: this.invoiceForm.value.name ?? '',
      status: this.invoiceForm.value.status ?? '',
      amount: this.invoiceForm.value.amount ?? 0,
      dateIssued: this.invoiceForm.value.dateIssued ?? ''
    }

    this.invoiceService.updateInvoice(updatedInvoice);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
