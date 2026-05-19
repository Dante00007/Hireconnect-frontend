import {
    inject
} from '@angular/core';

import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard:
    CanActivateFn = (
        route:
            ActivatedRouteSnapshot
    ) => {

        const authService =
            inject(AuthService);

        const router =
            inject(Router);

        const expectedRole =
            route.data['role'];

        const currentRole =
            authService
                .currentUser()
                ?.role;

        if (currentRole === expectedRole) {
            return true;
        }
        router.navigate(['/']);
        return false;
    };