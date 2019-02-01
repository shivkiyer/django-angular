import { Injectable } from '@angular/core';

import { JWTToken } from './../models/jwt-token.model';

@Injectable()
export class UserAuthService {

  getJWTToken(): string {
    return JWTToken.jwtToken;
  }

  setJWTToken(response: any) {
    console.log(response.headers.get("authorization"));
    if (response.headers.get("authorization")) {
      JWTToken.jwtToken = response.headers.get("authorization");
    }
  }

}
