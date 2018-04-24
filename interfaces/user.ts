export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: GenderEnum;
  emailAddress: string;
  profileImage: any;
}

export enum GenderEnum {
  Male = "m",
  Female = "f"
}