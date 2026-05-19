import {
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';

import {
    inject
} from '@angular/core';

import {
    catchError,
    throwError
} from 'rxjs';

import {
    ErrorService
} from '../services/error.service';

export const errorInterceptor:
    HttpInterceptorFn = (

        req,
        next

    ) => {

        const errorService =
            inject(ErrorService);

        return next(req).pipe(

            catchError(
                (
                    error:
                        HttpErrorResponse
                ) => {

                    let message =
                        'Something went wrong';

                    if (error.status === 0) {
                        message =
                            'Server unavailable';
                    }

                    else if (error.status === 401) {
                        message =
                            'Unauthorized access';
                    }

                    else if (error.status === 403) {
                        message =
                            'Access denied';
                    }

                    else if (error.status === 404) {
                        message =
                            'Resource not found';
                    }

                    else if (error.status >= 500) {
                        message =
                            'Internal server error';
                    }

                    else if (
                        error.error?.message
                    ) {
                        message =
                            error.error.message;
                    }

                    errorService
                        .showError(message);

                    return throwError(
                        () => error
                    );

                }

            )

        );

    };