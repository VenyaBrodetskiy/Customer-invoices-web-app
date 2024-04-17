import { AsyncPipe, DatePipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, filter, map, of, switchMap, takeUntil } from 'rxjs';
import { InvoiceStateService } from '../../services/invoice.service';
import { Invoice, NewInvoice } from '../../models/invoice.model';
import { States } from '../../constants';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'inv-invoice-detail',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AsyncPipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public isLoading$ = this.loadingService.isLoading$;
  
  invoiceForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    dateIssued: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceStateService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          if (id) {
            return this.invoiceService.getById(id)
          } else {
            this.setupNewInvoiceForm();
            return of(null);
          }
        }),
        filter(invoice => invoice !== null),
        takeUntil(this.unsubscribe$))
      .subscribe(invoice => {
        if (invoice) {
          this.invoiceForm.patchValue({
            ...invoice,
            dateIssued: formatDate(invoice.dateIssued, 'yyyy-MM-dd', 'en-US')
          }, { emitEvent: false })
        } else {
          this.router.navigate(['/404']);
        }
      });

    this.invoiceForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => { this.updateInvoice() }
      })
  }

  setupNewInvoiceForm(): void {
    this.invoiceForm.reset({
      id: 0,
      name: '',
      status: '',
      amount: 0,
      dateIssued: formatDate(new Date, 'yyyy-MM-dd', 'en-US')
    })
  }

  updateInvoice() {
    const invoiceId = this.invoiceForm.get('id')?.value;
    if (!invoiceId) return;
    if (!this.invoiceForm.valid) return;

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

  createInvoice() {
    if (!this.invoiceForm.valid) return;

    const newInvoice: NewInvoice = {
      name: this.invoiceForm.value.name!,
      status: this.invoiceForm.value.status!,
      amount: this.invoiceForm.value.amount!,
      dateIssued: this.invoiceForm.value.dateIssued!
    }

    console.log(`Creating invoice ${JSON.stringify(this.invoiceForm.value)}`);

    this.invoiceService.createInvoice(newInvoice);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate([`${States.invoices}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
