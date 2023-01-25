import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFromGroup! : FormGroup;
  errorMessages : any;

  constructor(private fb : FormBuilder, private authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.userFromGroup=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    });
  }

  handleLogin() {
    let username = this.userFromGroup.value.username;
    let password = this.userFromGroup.value.password;
    this.authService.login(username,password).subscribe({
      next : (appUser)=>{
        this.authService.authenticateUser(appUser).subscribe({
          next : (data)=>{
            this.router.navigateByUrl("/admin/products")
          }});
      },error : (err)=>{
        this.errorMessages=err;
      }
    });
  }
}
