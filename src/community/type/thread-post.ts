export interface ThreadPost {
  post_id: number;
  category: number;
  writer: string;
  title: string;
  createdAt: Date;
  content: string;
  view: number;
  like: number;
  is_like_click: boolean;
}