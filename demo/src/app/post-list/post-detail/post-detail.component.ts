import { Component, Input, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/authentication.service";
import { User } from "src/app/model/user.model";
import { Post } from "../../model/post.model";

@Component({
    selector: "app-post-detail",
    templateUrl: "./post-detail.component.html",
    styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit {
    currentUser: User;
    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
           
        );
        
    }
    @Input() post: Post;
    ngOnInit(): void {}
}
