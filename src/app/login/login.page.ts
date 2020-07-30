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
  isLoading: boolean = false;

  constructor(private router: Router, private loginService: LoginService, public alertController: AlertController) { }

  onLogin(loginInput: ILogin): void {
    this.isLoading = !this.isLoading;
    this.loginService.login(loginInput).subscribe((res: ILoginResponse) => {
      localStorage.setItem('Authorization', `Token ${res.token}`);
      this.isLoading = !this.isLoading;
      this.router.navigateByUrl('/products');
    }, async (err: HttpErrorResponse) => {
      this.isLoading = !this.isLoading;
      const alert = await this.alertController.create({
        header: 'Login Unsuccessful',
        subHeader: err.error.non_field_errors[0],
        message: 'Please enter correct credentials',
        buttons: ['Cancel']
      });
      await alert.present();
    });
  }
}
