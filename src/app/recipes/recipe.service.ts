import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    recipes: Recipe[] = [
        new Recipe(
            'Pizza', 
            'Italian Food', 
            'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
            [
                new Ingredient('Dough',2),
                new Ingredient('Cheese',4),
                new Ingredient('Gluten',2)
            ]
        ),
        new Recipe(
            'Burger', 
            'Hamburg Food', 
            'https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg',
            [
                new Ingredient('Bread Crumbs',2),
                new Ingredient('Egg',1),
                new Ingredient('Olive Oil',10)
            ]
        )
    ];
    
    constructor(private slService: ShoppingListService){}
    // setRecipes(recipe: Recipe[]){
    //     this.recipesChanged.next(this.recipes.slice());
    // }
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    allRecipes() {
        return this.recipes.slice();
    }
    
    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());        
    }
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}