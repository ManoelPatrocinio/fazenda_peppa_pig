import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService,ApiService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AppComponent {
  title = 'F. Peppa Pig';

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.authService.autoLogin();
  }
}
