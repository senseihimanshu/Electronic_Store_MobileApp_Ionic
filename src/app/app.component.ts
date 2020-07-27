import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout(): void {
    localStorage.removeItem('Authorization');
    this.menu.close();
    this.router.navigateByUrl('/login');
  }
}
