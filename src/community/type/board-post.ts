export interface BoardPost {
  post_id: number;
  category: number;
  writer: string;
  title: string;
  createdAt: Date;
  view: number;
  like: number;
  comment_count: number;
}