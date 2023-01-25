import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(private router: Router ,public auth : AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.auth.logout().subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/login");
      }
    })
  }
}
