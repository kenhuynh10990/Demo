import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./model/user.model";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    userLogin: User;
    userId: number;

    constructor(private http: HttpClient, private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem("currentUser"))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(userId) {
        // this.userService.getAllUser().subscribe((data) => {
        //     this.userLogin = data;
        // });
        // this.userLogin.filter((item) => {
        //     if (item.userName == userName && item.password == password) {
        //         this.userId = item.userId;
        //     }
        // });
        return this.http
            .get<any>(
                "https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user/" +
                    userId
            )
            .pipe(
                map((user) => {
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}
