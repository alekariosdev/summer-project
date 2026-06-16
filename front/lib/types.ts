export type STRAPI_ROLE = {
  id: number;
  name: string;
  type: string;
};

export type AUTH_USER = {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role?: STRAPI_ROLE;
  createdAt: string;
  updatedAt: string;
};
