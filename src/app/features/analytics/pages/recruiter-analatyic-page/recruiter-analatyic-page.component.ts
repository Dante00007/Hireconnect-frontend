import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  StatCardComponent
} from '../../components/stat-card/stat-card.component';

import {
  RecentApplicationCardComponent
} from '../../components/recent-application-card/recent-application-card.component';
import { AnalyticService } from '../../../../core/services/analytic.service';
import { StatusChartComponent } from '../../components/status-chart/status-chart.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';

@Component({
  selector:
    'app-recruiter-dashboard-page',

  standalone: true,

  imports: [
    CommonModule,
    StatCardComponent,
    StatusChartComponent,
    RecentApplicationCardComponent,
    PageLoaderComponent
  ],

  templateUrl:
    './recruiter-analatyic-page.component.html',

  styleUrl: './recruiter-analatyic-page.component.css'
})
export class RecruiterAnalatyicPageComponent {

  private analyticService =
    inject(AnalyticService);

  dashboard =
    this.analyticService.dashboard;

  loading = signal(false);

  ngOnInit() {
    this.loading.set(true);
    this.analyticService
      .getRecruiterDashboard()
      .subscribe(() => {
        this.loading.set(false);
      });
  }

}