import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // loadedFeature = 'recipe';

  // onNavigate(feature: string){
  //   this.loadedFeature = feature; 
  // }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCNeTeMa9xk03mrQNy9gzFHMiwMuu7ZYTI",
      authDomain: "ng-recipe-project-c528d.firebaseapp.com"
    })
  }
}
