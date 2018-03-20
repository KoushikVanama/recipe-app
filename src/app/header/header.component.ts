import { Component } from "@angular/core";
import { Response } from '@angular/http';
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth-service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    constructor(private datastorage: DataStorageService, private authservice: AuthService){}

    onSave(){
        this.datastorage.storeRecipes()
        .subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }
    onFetch(){
        this.datastorage.getRecipes();
    }
    onLogout(){
        this.authservice.logout();
    }
}
