import {
  Component,
  Input,
  computed
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector:
    'app-interview-status-badge',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './interview-status-badge.component.html',

  styleUrl:
    './interview-status-badge.component.css'
})
export class InterviewStatusBadgeComponent {

  @Input()
  status = '';

  badgeClass = computed(() => {

    switch(
      this.status.toLowerCase()
    ) {

      case 'confirmed':
        return 'confirmed';

      case 'cancelled':
        return 'cancelled';

      case 'completed':
        return 'completed';

      case 'rescheduled':
        return 'rescheduled';

      default:
        return 'scheduled';

    }

  });

}