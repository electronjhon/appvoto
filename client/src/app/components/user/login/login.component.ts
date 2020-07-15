import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }
  public user: UserInterface = {
    email: "",
    password: "",
  }
  public isError = false;
  ngOnInit(): void { }
  onLogin(form: NgForm) {
    if (form.valid) {
      return this.authService.loginUser(this.user.email, this.user.password)
        .subscribe(data => {
          this.authService.setUser(data.user)
          let token = data.id;
          this.authService.setToken(token);
          //this.router.navigate(["user/profile"]);
          this.location.replaceState('user/profile');
          location.reload();
          this.isError = false;
        },
          error => this.onIsError()
        );
    } else {
      this.onIsError();
    }
  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false
    }, 3000)
  }
}
