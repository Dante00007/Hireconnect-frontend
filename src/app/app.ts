import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RealtimeService } from './core/services/realtime.service';
import { ErrorToastComponent } from './shared/components/error-toast/error-toast.component';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,ErrorToastComponent,GlobalLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private realtimeService = inject(RealtimeService);
  protected readonly title = signal('Hireconnect-Frontend');

  ngOnInit() {

    this.realtimeService
      .startConnection();

  }

}
