import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from "../model/user.model";
import { PostService } from "../post.service";

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
    postForm: FormGroup;
    currentUser: User;
    isSubmiting = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private postService: PostService,
        private authenticationService: AuthenticationService,
        private route:ActivatedRoute,
        private router:Router
    ) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }

    ngOnInit(): void {
        this.postForm = this.formBuilder.group({
            content: ["", Validators.required],
            image: [""],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        if (!this.postForm.invalid) {
            this.isSubmiting = true;
            this.postService
                .addNewPost(this.currentUser.userId, this.postForm.value)
                .subscribe(() => {
                    const post = {
                        ...this.postForm.value,
                        user: {
                            ...this.currentUser,
                        }
                    };
                });
                this.router.navigate([this.returnUrl]);
                alert("Success");
                
        }
        

    }
}
