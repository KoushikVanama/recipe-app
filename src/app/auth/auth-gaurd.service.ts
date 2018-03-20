import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private authservice: AuthService){}

    canActivate(){
        return this.authservice.isAuthenticated();
    }

}