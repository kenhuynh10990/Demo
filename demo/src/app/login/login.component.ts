import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthenticationService } from "../authentication.service";
import { User } from "../model/user.model";
import { UserService } from "../user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    userLogin: User;
    isCheckLogin = false;
    userId: number;

    constructor(
        private form: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.form.group({
            userName: ["", Validators.required],
            password: ["", Validators.required],
        });

        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }
    get f() {
        return this.loginForm.controls;
    }
    async checkUserLogin() {
        const userLogin = await this.userService.getAllUser().toPromise();
        userLogin.filter((item) => {
            if (
                item.userName == this.f.userName.value &&
                item.password == this.f.password.value
            ) {
                this.isCheckLogin = true;
                this.userId = item.userId;
            }
        });
        return this.isCheckLogin;
    }
    async onSubmit() {
        let check = await this.checkUserLogin();

        if (this.loginForm.invalid) {
            return;
        }
        if (check) {
            (await this.authenticationService.login(this.userId)).subscribe((data) => {
                this.router.navigate([this.returnUrl]);
            });
        } else {
            alert("Username or password is incorrect");
        }

        // this.authenticationService
        //   .login(this.f.userName.value, this.f.password.value)
        //   .subscribe(
        //     (data) => {
        //       this.router.navigate([this.returnUrl]);
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
    }
}
