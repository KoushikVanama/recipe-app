import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    tk: string;
    constructor(private router: Router){}
    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            ) 
    }
    signinUser(email:string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                console.log(response);
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken()
                .then(
                    (token: string) => this.tk = token
                )
            }
        )
        .catch(
            error => console.log(error)
        )
    }
    getToken(){
        // firebase.auth().currentUser.getToken();
        firebase.auth().currentUser.getToken()
        .then(
            (token: string) => this.tk = token
        );
        return this.tk;
    }
    isAuthenticated(){
        return this.tk != null;
    }
    logout(){
        firebase.auth().signOut();
        this.tk = null;
    }
}