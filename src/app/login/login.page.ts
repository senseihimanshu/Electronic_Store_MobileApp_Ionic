import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { ILogin, ILoginResponse } from './login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router, private loginService: LoginService, public alertController: AlertController) { }

  onLogin(loginInput: ILogin): void {
    this.loginService.login(loginInput).subscribe((res: ILoginResponse) => {
      localStorage.setItem('Authorization', `Token ${res.token}`);
      this.router.navigateByUrl('/products');
    }, async (err: HttpErrorResponse) => {
      const alert = await this.alertController.create({
        header: 'Login Unsuccessful',
        subHeader: err.error.error.message,
        message: 'Please enter correct credentials',
        buttons: ['Cancel']
      });
      await alert.present();
    });
  }
}
