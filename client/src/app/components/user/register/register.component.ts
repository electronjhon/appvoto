import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public user: UserInterface = {
    name: '',
    email: '',
    password: ''
  }
  public isError = false;
  public msgError = '';
  ngOnInit(): void { }

  onRegister(form: NgForm): void {
    if (form.valid) {
      this.authService.registerUser(
        this.user.name,
        this.user.email,
        this.user.password
      )
        .subscribe(user => {
          this.authService.setUser(user);
          this.router.navigate(["user/login"]);
        },
          res => {
            this.msgError = res.error.error.details.messages.email
            this.onIsError();
          }
        )
    } else
      this.onIsError();
  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false
    }, 4000)
  }
}

