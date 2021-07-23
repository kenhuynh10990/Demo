import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CommentService } from '../comment.service';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit,OnChanges {
@Input("comment") comment: Comment[];
@Input("post") post:Post;
currentUser:User;
  constructor(private commentService:CommentService,
    private authenticationService:AuthenticationService) { 
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }
    ngOnChanges(){
        if (this.comment !== undefined) {
            console.log('Main array====>', this.comment);
          }
    }

  ngOnInit(): void {
    this.commentService.getComment(this.currentUser.userId,this.post.id).subscribe(data=>{
        this.comment=data;
        
    });
  }

}
