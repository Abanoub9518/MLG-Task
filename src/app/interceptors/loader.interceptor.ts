import { HttpInterceptorFn } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { inject } from "@angular/core";
import { LoaderService } from "../services/loader.service";

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.showLoader();

  return next(req).pipe(
    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
