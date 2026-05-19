import {
    HttpInterceptorFn
} from '@angular/common/http';

import {
    finalize
} from 'rxjs';

import {
    inject
} from '@angular/core';

import {
    LoaderService
} from '../services/loader.service';

export const loadingInterceptor:
    HttpInterceptorFn = (

        req,
        next

    ) => {

        const loaderService =
            inject(LoaderService);

        loaderService.show();

        return next(req).pipe(

            finalize(() => {

                loaderService.hide();

            })

        );

    };