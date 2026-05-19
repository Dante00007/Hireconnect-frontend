import {
  Component,
  Input,
  computed,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './status-badge.component.html',

  styleUrls:
    ['./status-badge.component.css']
})
export class StatusBadgeComponent {

  @Input()
  status = '';

  badgeClass = computed(() => {

    switch(
      this.status.toLowerCase()
    ) {

      case 'accepted':
        return 'accepted';

      case 'rejected':
        return 'rejected';

      case 'interview':
        return 'interview';

      default:
        return 'applied';
    }

  });

}