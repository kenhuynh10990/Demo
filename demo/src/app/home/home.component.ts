import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
currentUser:User;
  constructor(private authenticationService:AuthenticationService,
    private router: Router) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser=x)
     }

  ngOnInit(): void {
  }
get isLogged(){
    return this.currentUser;
}
logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);

}
}
