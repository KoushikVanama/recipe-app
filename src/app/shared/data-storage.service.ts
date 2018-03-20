import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth-service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService,
                private authservice: AuthService){}

        storeRecipes() {
            return this.http.put('https://ng-recipe-project-c528d.firebaseio.com/recipes.json', this.recipeService.allRecipes());
        }
        getRecipes(){
            const token = this.authservice.getToken();
            this.http.get('https://ng-recipe-project-c528d.firebaseio.com/recipes.json?auth=' + token)
            .subscribe(
                (response: Response) => {
                    console.log(response);
                    const recipes:Recipe[] = response.json();
                    this.recipeService.setRecipes(recipes);
                }
            )
        }
}