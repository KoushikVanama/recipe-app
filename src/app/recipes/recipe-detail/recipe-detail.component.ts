import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recService.getRecipe(this.id);
    });
  }

  onEdit(){
    this.router.navigate(["edit"], {relativeTo: this.route});
    // this.router.navigate(["../",this.id,"edit"], {relativeTo: this.route});
  }
  onDelete(){
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList(){
    this.recService.addIngredientsToShoppingList(this.recipe.ingredient);
  }

}
