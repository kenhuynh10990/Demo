import { Post } from "./post.model";
import { User } from "./user.model";

export class Comment{
    id:number;
    content:string
    user:User;
    post:Post;
}