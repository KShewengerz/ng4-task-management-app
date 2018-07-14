export enum UserFields {
  Table     = "user",

  Id           = "id",
  FirstName    = "first_name",
  LastName     = "last_name",
  Username     = "username",
  Password     = "password",
  Gender       = "gender",
  EmailAddress = "email_address",
  ProfileImage = "profile_image"
}

export enum UserSessionFields {
  Table = "user_session",
  
  Id          = "id",
  SessionId   = "session_id",
  UserId      = "user_id",
  isLoggedOut = "is_logged_out"
}