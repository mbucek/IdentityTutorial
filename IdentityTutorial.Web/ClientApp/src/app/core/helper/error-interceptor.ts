import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorInterceptor {
  public static toastr: ToastrService = null;

  public static catchErrorMessage(error: HttpErrorResponse): Promise<HttpErrorResponse> {
    if (error.status === 500) {
      ErrorInterceptor.toastr.error('Interner Server Fehler! ' + error.message);
    } else if (error.status === 400) {
      ErrorInterceptor.toastr.error('Fehlerhafte Seitenangabe: Bad Request '+error.message);
    } else if (error.status === 404) {
      ErrorInterceptor.toastr.error('Seite nicht gefunden! '+error.message);
    } else
    {
        ErrorInterceptor.toastr.error(error.message); 
    }

    return new Promise(resolve => resolve(error));
  }

  public static toastWarningMessage(text: string) {
    ErrorInterceptor.toastr.warning(text); 
  }

  public static toastErrorMessage(text: string) {
    ErrorInterceptor.toastr.error(text); 
  }

  // private static getErrorMessage(error: HttpErrorResponse): string {
  //   if (error.error.message != null) {
  //     return error.error.errorMessage;
  //   } else if (error.error.errors != null && error.error.errors.length !== 0) {
  //     let errorMessage: string = '';

  //     for (let errorItem of error.error.errors) {
  //       errorMessage += errorItem.description + '\n';
  //     }

  //     return errorMessage;
  //   }
  // }
}
