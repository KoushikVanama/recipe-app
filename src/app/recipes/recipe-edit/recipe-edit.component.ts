import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingredient']){
        for(let ingr of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredient': recipeIngredients
    })
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onSubmit(){
    console.log(this.recipeForm);
    // const newRecipe = new Recipe(
      // this.recipeForm.value['name'],
      // this.recipeForm.value['description'],
      // this.recipeForm.value['imagePath'],
      // this.recipeForm.value['ingredient']
    // );
    if(this.editMode){
      // this.recService.updateRecipe(this.id,newRecipe);
      this.recService.updateRecipe(this.id, this.recipeForm.value);      
    }else{
      // this.recService.addRecipe(newRecipe);      
      this.recService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
    // this.recipeForm.reset();
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }
}
