import {
    Component
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    FeatureCardComponent
} from '../feature-card/feature-card.component';

@Component({
    selector: 'app-features-section',

    standalone: true,

    imports: [
        CommonModule,
        FeatureCardComponent
    ],

    templateUrl:
        './features-section.component.html',

    styleUrls:
        ['./features-section.component.css']
})
export class FeaturesSectionComponent {

    features = [

        {
            icon: '⚡',

            title:
                'Realtime Notifications',

            description:
                'Instant updates powered by SignalR and RabbitMQ.'
        },

        {
            icon: '📊',

            title:
                'Recruiter Analytics',

            description:
                'Track hiring workflows and application performance.'
        },

        {
            icon: '🎤',

            title:
                'Interview Scheduling',

            description:
                'Manage interviews with confirmations and realtime status updates.'
        },

        {
            icon: '💼',

            title:
                'Smart Job Management',

            description:
                'Post, manage and track jobs with modern workflows.'
        }

    ];

}