export interface LoginForm {
  identifier: string;
  password: string;
}

export interface RegisterForm {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type login = {
  accessToken: string;
};
