import {
    Component
} from '@angular/core';

import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { StatsSectionComponent } from '../../components/stats-section/stats-section.component';
import { WorkflowSectionComponent } from '../../components/workflow-section/workflow-section.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { FeaturesSectionComponent } from '../../components/feature-section/features-section.component';

@Component({
    selector: 'app-home-page',

    standalone: true,

    imports: [
        HeroSectionComponent,
        FeaturesSectionComponent,
        WorkflowSectionComponent,
        StatsSectionComponent,
        CtaSectionComponent
    ],

    templateUrl:
        './home-page.component.html',

    styleUrls:
        ['./home-page.component.css']
})
export class HomePageComponent {

}