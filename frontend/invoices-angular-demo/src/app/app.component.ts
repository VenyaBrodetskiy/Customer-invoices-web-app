import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { ToastComponent } from "./shared/components/toast/toast.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MainLayoutComponent, LoadingBarComponent, ToastComponent]
})
export class AppComponent {

}
