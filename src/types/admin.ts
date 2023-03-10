import { TUserRole } from './auth-form';

export type TAdminUserDto = {
  id: number;
  userName: string;
  email: string;
  banReason: string;
  roles: TUserRole[];
  banned: boolean;
  avatar: string;
};

export type TAdminInitialState = {
  users: TAdminUserDto[];
};
