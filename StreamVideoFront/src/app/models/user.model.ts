export interface User {
  id: string;
  username: string;
  email: string;
  coins: number;
  active: boolean;
}

export interface UserToken {
  username: string;
  token: string;
}