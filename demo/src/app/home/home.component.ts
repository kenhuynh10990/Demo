import { Comment } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { CommentService } from "../comment.service";
import { Post } from "../model/post.model";
import { User } from "../model/user.model";
import { PostService } from "../post.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    currentUser: User;
    postList: Post[] = [];
    postListIsFetching = true;
    commentForm: FormGroup;
    user:User;
    post: Post;
    

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private postService: PostService,
        private formBuilder:FormBuilder,
        private commentService:CommentService
    ) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.postService
                .getPost(this.currentUser.userId)
                .subscribe((data: Post[]) => {
                    this.postList = data;
                    this.postListIsFetching = false;
                });
        }, 1000);

        this.commentForm = this.formBuilder.group({
            content: [""],
            
        });
    }
    get isLogged() {
        return this.currentUser;
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    }

    submitCommentForm(post: Post) {
        console.log(post.id)
        
        this.commentForm.controls.content.setValue(
            this.commentForm.get("content").value.trim()
        );
        this.commentService
            .createComment(
                this.currentUser.userId,
                post.id,
                this.commentForm.value
            )
            .subscribe(() => {
                const comment = {
                    ...this.commentForm.value
                };
                this.commentForm.reset();
            });
    }
}
