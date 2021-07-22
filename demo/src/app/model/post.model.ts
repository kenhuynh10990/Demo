import { Comment } from "./comment.model";
import { User } from "./user.model";

export class Post{
    id:number;
    content:string;
    image: string;
    user:User;
    comment:Comment[];
  }