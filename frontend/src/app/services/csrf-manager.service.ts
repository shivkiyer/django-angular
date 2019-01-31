// export const CookieManager = {
//   csrfToken: ''
// }

import { CSRFCookieModel } from './../models/csrf-cookie.model';

export class CSRFManagerService {
  getToken() {
    return CSRFCookieModel.csrfToken;
  }

  setToken(token: string) {
    CSRFCookieModel.csrfToken = token;
  }

}
