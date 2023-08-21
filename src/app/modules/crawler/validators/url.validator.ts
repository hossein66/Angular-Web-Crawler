import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CrawlerService } from "../services/crawler.service";

    export function UrlValidator(customerService: CrawlerService): ValidatorFn {
      return (control: AbstractControl ): { [key: string]: any  } | null  => {
        if (control.value) {
          return !customerService.isValidURL(control.value) ? 
          { urlError : true } : null;
        }
      return null;
      };
    }
  