import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';
// import * as alertyfy from 'alertifyjs';
import { AlertyfyService } from '../alertyfy.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css'],
})
export class LoginSignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  isSignedUp: boolean = false;
  isSignedIn: boolean = false;
  errorMessage: string = '';
  signinEmail: string = '';

  registeredUsers: { email: string, password: string }[] = [];
  userLoggedIn: boolean=false;

  


  constructor(private lsdataServ: DataServiceService,private router:Router,private alertyfy : AlertyfyService) {}

  closeNav() {
    const sidenav = document.getElementById('mySidenav');
    if (sidenav) {
      sidenav.style.width = '60px';
    }
  }

  openNav() {
    const sidenav = document.getElementById('mySidenav');
    if (sidenav) {
      sidenav.style.width = '100px';
    }
  }
  

  onSignUpFormSubmit() {
    if (this.name && this.email && this.password) {
      this.handleUserRegistration();
    } else {
    }
  }

 
  

  handleUserRegistration() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.lsdataServ.postLSDetails(user).subscribe(
      (data: any) => {
        console.log('Registration response:', data);
        this.name = '';
        this.email = '';
        this.password = '';
        this.isSignedUp = true;
        this.registeredUsers.push(user);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  // Login=new FormGroup({
  //   email : new FormControl('',[Validators.required]),
  //   password: new FormControl('',[Validators.required])
  // });

  // get Email():FormControl{
  //   return this.Login.get("email") as FormControl;
  // }
  // get Password():FormControl{
  //   return this.Login.get("password") as FormControl;
  // }



  onSignInFormSubmit() {
    console.log('Sign In form submitted');

    if (this.signinEmail && this.password) {
      console.log('Email:', this.signinEmail);
      console.log('Password:', this.password);  
      this.handleUserLogin();
    } else {
    }
  }

  handleUserLogin() {
    const login = {
      email: this.signinEmail,
      password: this.password,
    };
    this.lsdataServ.postLSSignIn(login).subscribe(
      (response: any) => {
        if ( response.status === 'success') {
          this.isSignedIn = true;
          this.errorMessage = ''; 
          this.lsdataServ.setUserSignedIn(true);
          this.alertyfy.success('Login succcessful');
          console.log('Login successful');
          //this.router.navigate(['/header']);
        } else {
          this.errorMessage = 'Invalid email or password. Please sign up first.';
          // this.alertyfy.error('Login failed');
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred. Please try again.';
        this.alertyfy.error('Login failed');
      }
    );
  }
  // onLogin(userIsLoggedIn: boolean) {
  //   this.userLoggedIn = userIsLoggedIn;
  // }

  signOut(){
    this.isSignedIn = false;
  }

  toggleSignInSignUp() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('right-panel-active');
    }
  }

}



