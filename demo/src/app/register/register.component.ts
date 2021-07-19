import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    userAlready:User;
    checkUserExist=false;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private authenticationService:AuthenticationService,
    private userService:UserService) { }

  ngOnInit(): void {
      this.registerForm=this.formBuilder.group({
          userName:['',Validators.required],
          password:['',[Validators.required,Validators.minLength(6)]]
      });
  }
  checkUser(){
     
    this.userService.getAllUser().subscribe(data=>{
        this.userAlready=data;
    });
    this.userAlready.filter((item: { userName: string; }) =>{
      if(item.userName==this.registerForm.value['userName']){
          this.checkUserExist=true;
      }
    }) 
    return this.checkUserExist;

  }

  onSubmit(){

    if(this.registerForm.invalid){
        return;
    }

   
    if( !this.checkUser()){
  
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(
        data =>{
            alert('Register success');
            this.router.navigate(['/login']);
        }
    );
    }else{
    alert('Username has already')
    }
  
  }

}
