export type Article = {
  title: string;
  content: string;
};
export interface Blog {
  title: string;
  article: Article[];
  topic: string;
  tags: string[];
  img: string;
  created_at: number;
  expires_at: number;
}
