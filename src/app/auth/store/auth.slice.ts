import { User } from '../../models/user';

export interface AuthSlice {
  readonly user: User | undefined;
}

export const authFeatureKey = 'auth';

export const initialAuthSlice: AuthSlice = {
  user: undefined,
};
