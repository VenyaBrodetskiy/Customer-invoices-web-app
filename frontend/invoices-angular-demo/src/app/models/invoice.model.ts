export interface Invoice {
  id: number;
  name: string;
  dateIssued: string;
  status: string;
  amount: number;
}

export interface NewInvoice {
  name: string;
  dateIssued: string;
  status: string;
  amount: number;
}