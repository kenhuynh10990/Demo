import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { log } from "console";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../authentication.service";
import { User } from "../model/user.model";
import { UserService } from "../user.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    userAlready: User;
    // checkUserExist = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            userName: ["", Validators.required],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });
    }
    async checkUser() {
        let checkUserExist = false;
        const userAlready = await this.userService.getAllUser().toPromise();
        // this.userService.getAllUser().subscribe((data) => {
        //     this.userAlready = data;
        // });
        // promise.then((data)=>{
        //     this.userAlready=data;
        //     this.userAlready.filter((item: { userName: string }) => {
        //         if (item.userName == this.registerForm.value["userName"]) {
        //             this.checkUserExist = true;
        //         }
        //     });
        //     console.log("a");
        // })
        userAlready.filter((item: { userName: string }) => {
            if (item.userName == this.registerForm.value["userName"]) {
                checkUserExist = true;
                console.log(item.userName);
            } else {
                console.log("error");
            }
        });
        console.log(checkUserExist + "1");
        return checkUserExist;
    }

    async onSubmit() {
        if (this.registerForm.invalid) {
            return;
        }

        let check = await this.checkUser();
        if (!check) {
            this.userService
                .register(this.registerForm.value)
                .pipe(first())
                .subscribe((data) => {
                    alert("Register success");
                    this.router.navigate(["/login"]);
                });
        } else {
            //    console.log(checkUserExist+"2");

            alert("Username has already");
        }
    }
}
