import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'inv-invoice-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit {
  invoice: Invoice | undefined;

  constructor(
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const invoiceId = params.get('id');
      this.invoice = {
        id: invoiceId !== null ? +invoiceId : -1,
        dateIssued: new Date(),
        status: 'Pending',
        amount: 400,
      }
    })
  }

  // TODO: pass data from prev component or retrieve from DB

  goBack(): void {
    this.location.back();
  }
}
