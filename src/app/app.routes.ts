import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.gard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>

            import(
                './features/home/pages/home-page/home-page.component'
            )
                .then(m =>
                    m.HomePageComponent
                )
    },
    {
        path: 'auth',
        children: [
            {
                path: 'register',
                loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
            }
        ]
    },
    {
        path: 'profile',
        canActivate: [
            authGuard
        ],
        loadComponent: () =>
            import('./features/profile/pages/profile-page/profile-page.component')
                .then(m => m.ProfilePageComponent)
    },
    {
        path: 'recruiter',
        canActivate: [
            authGuard,
            roleGuard
        ],

        data: {
            role: 'Recruiter'
        },
        children: [
            {
                path: 'jobs',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/jobs/pages/recruiter-job-page/recruiter-job-page.component')
                                .then(m => m.RecruiterJobsPageComponent)
                    },
                    {
                        path: 'create',
                        loadComponent: () =>
                            import('./features/jobs/pages/create-job-page/create-job-page.component')
                                .then(m => m.CreateJobPageComponent)
                    },
                    {
                        path: 'edit/:id',

                        loadComponent: () =>
                            import('./features/jobs/pages/edit-job-page/edit-job-page.component')
                                .then(m => m.EditJobPageComponent)
                    },
                    {
                        path: ':id/applications',
                        loadComponent: () =>
                            import('./features/applications/pages/recruiter-applications-page/recruiter-applications-page.component')
                                .then(
                                    m =>
                                        m.RecruiterApplicationsPageComponent
                                )

                    }

                ]

            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/recruiter/pages/recruiter-dashboard/recruiter-dashboard.component')
                        .then(m => m.RecruiterDashboardComponent)
            },
            {
                path: 'interviews',
                loadComponent: () =>
                    import('./features/interviews/pages/recruiter-interviews-page/recruiter-interviews-page.component')
                        .then(
                            m =>
                                m.RecruiterInterviewsPageComponent
                        )
            },
            {
                path: 'analytics',
                loadComponent: () =>
                    import('./features/analytics/pages/recruiter-analatyic-page/recruiter-analatyic-page.component')
                        .then(
                            m =>
                                m.RecruiterAnalatyicPageComponent
                        )
            }
        ]
    },
    {
        path: 'candidate',
        canActivate: [
            authGuard,
            roleGuard
        ],

        data: {
            role: 'Candidate'
        },
        children: [
            {
                path: 'jobs',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./features/jobs/pages/candidate-jobs-page/candidate-jobs-page.component')
                                .then(m => m.CandidateJobsPageComponent)
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./features/jobs/pages/job-details-page/job-details-page.component')
                                .then(m => m.JobDetailsPageComponent)
                    },
                ]
            },
            {
                path: 'applications',
                loadComponent: () =>
                    import('./features/applications/pages/my-applications-page/my-applications-page.component')
                        .then(m => m.MyApplicationsPageComponent)
            },
            {
                path: 'interviews',
                loadComponent: () =>
                    import('./features/interviews/pages/candidate-interviews-page/candidate-interviews-page.component')
                        .then(
                            m =>
                                m.CandidateInterviewsPageComponent
                        )
            }
        ]
    },

];
