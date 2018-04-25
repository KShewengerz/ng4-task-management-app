import { Gender } from "../enums/gender";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: Gender;
  emailAddress: string;
  profileImage: any;
}