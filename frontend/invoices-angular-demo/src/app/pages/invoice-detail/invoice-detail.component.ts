import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'inv-invoice-detail',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit {
  invoiceForm = new FormGroup({
    id: new FormControl(0),
    status: new FormControl(''),
    amount: new FormControl(0),
    dateIssued: new FormControl(''),
  });

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const invoiceIdString = params.get('id');
      const invoiceId = invoiceIdString ? +invoiceIdString : 0;

      this.invoiceForm.patchValue({
        id: invoiceId,
        status: 'Paid',
        amount: 1500,
        dateIssued: '2024-04-15'
      })
    });

    this.invoiceForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe({
        next: () => { this.updateInvoice() }
      })
  }

  // TODO: pass data from prev component or retrieve from DB

  get statusControl(): FormControl<string> {
    return this.invoiceForm.get('status') as FormControl<string>;
  }

  get amountControl(): FormControl<number> {
    return this.invoiceForm.get('amount') as FormControl<number>;
  }

  get dateIssuedControl(): FormControl<string> {
    return this.invoiceForm.get('dateIssued') as FormControl<string>;
  }

  updateInvoice() {
    const invoiceId = this.invoiceForm.get('id')?.value;

    console.log(`Updating ${invoiceId} to ${this.invoiceForm.value}`);
    
    this.http
      .patch(`https://localhost:1111/invoices/${invoiceId}`, this.invoiceForm.value)
      .subscribe({
        next: (reponse) => console.log('Updated invoice', reponse),
        error: (error) => console.error('Update failed', error),
      });
  }

  goBack(): void {
    this.location.back();
  }
}
