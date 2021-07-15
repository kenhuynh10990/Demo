import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

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

  onSubmit(){
    //   this.submitted = true;

    if(this.registerForm.invalid){
        return;
    }

    this.userService.register(this.registerForm.value).pipe(first()).subscribe(
        data =>{
            alert('Register success');
            this.router.navigate(['/login']);
        }
    );
  }

}
