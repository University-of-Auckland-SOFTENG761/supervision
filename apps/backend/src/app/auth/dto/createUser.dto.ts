export interface CreateUserDto {
  name: {
    first: string;
    surname: string;
  };
  email: string;
  username: string;
  password: string;
}
