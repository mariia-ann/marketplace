import { Answer } from "./Answer";

export interface Comment {
  author: string;
  date: string;
  comment: string;
  answers?: Answer[];
}
