import {Blog} from "./blog";
/**
 * Created by tianzhang on 2017/1/1.
 */
export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  head_image: string;
}


export class UserExtend {
  id: number;
  username: string;
  head_image: string;
  background_image: string;
  background_color: string;
  u_title: string;
  profile: string;
  url: string;
  like_count: number;
  follow_count: number;
}

export class UserExtendWithBlog {
  user: UserExtend;

  blogs: Blog[];
}


export class Follow {
  follower: string; //this should be string
}

export class Like {
  user:string;
  blog: string; //this should be string
}
