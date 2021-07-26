import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Post } from "../model/post.model";
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
    // srcResult;
    public image: SafeStyle;
    imageUrlFromLocal: string;
    imageFile: File;
    imageSrc: string;

    
    constructor(
        private formBuilder: FormBuilder,
        private postService: PostService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitization: DomSanitizer
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
        
    }
 

    public getSantizeUrl(url: string) {
        return this.sanitization.bypassSecurityTrustUrl(url);
    }
    importImages(event) {
        // let files =event.target.files;
        // if(files){
        //     for(let file of files){
        //         const name =file.type;
        //         const size = file.size;
        //         if(name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)){
        //             const reader =new FileReader();
        //             reader.onload = (e: any) => {
        //                 this.imageUrlFromLocal = e.target.result;
        //                 this.postForm.patchValue({
        //                     image:reader.result,
        //                 })
        //               }
        //               reader.readAsDataURL(event.target.files[0]);

        //               this.imageFile = event.target.files[0];
        //             }
        //     }

        // }
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.imageSrc = reader.result as string;

                console.log(this.imageSrc);
                this.postForm.value["image"] = this.imageSrc;
            };
        }
    }
    clearForm() {
        this.postForm.reset();
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
                        },
                    };
                   
                    this.isSubmiting = false;
                    this.clearForm();
                });
        }
        
    }
}
