import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { PageNotFoundComponent } from './pages/404/pagenotfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'invoices', component: InvoicesComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];
