import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router:Router, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }

  onLogin(username:string, password:string) {
    this.isLoading = true;
    this.authService.login(username,password).subscribe({
      next:(response) => {
        const token = response.headers.get('Jwt-Token');
        this.authService.saveToken(token);
        this.authService.addUserToLocalCache(response.body);
    }
    })

    this.loadingCtrl.create({keyboardClose: true, message: 'Loggin in ...'})
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home/tabs/liste-fiche');
        },1500)
      })


  }

  onSubmit(form:NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    if (this.isLogin){
      this.onLogin(username,password)

    } else {
      // envoie requete signup
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
