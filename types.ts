export interface UserInterface {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogInterface {
  _id?: string;
  title: string;
  content: string;
  likeCount: number;
  usersLiked: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentInterface {
  _id?: string;
  comment: string;
  blog: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
