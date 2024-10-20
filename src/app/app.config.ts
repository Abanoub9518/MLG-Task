import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ConfirmationService, MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([LoaderInterceptor])),
    provideAnimations(),
    MessageService,
    ConfirmationService,
  ],
};
