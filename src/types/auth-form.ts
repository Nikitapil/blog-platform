export type AuthFormData = {
  email: string;
  password: string;
  userName: string;
};

export type TUserRoles = {
  id: number;
  roleId: number;
  userId: number;
};

export type TUserRole = {
  id: number;
  value: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  UserRoles: TUserRoles;
};

export type TUserUiRole = TUserRole & {
  checked: boolean;
};

export type TUser = {
  banReason: string;
  userName: string;
  email: string;
  id: number;
  roles: TUserRole[];
  banned: boolean;
  avatar: string;
  isAdmin: boolean;
};

export type TAuthStore = {
  isAuthLoading: boolean;
  user: TUser | null;
  signError: string;
};

export type TAuthResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};
