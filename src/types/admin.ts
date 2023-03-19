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

export type TAdminAllUsersResponse = {
  count: number;
  users: TAdminUserDto[];
};

export type TAdminInitialState = {
  users: TAdminUserDto[];
  roles: TUserRole[];
  usersCount: number;
};
