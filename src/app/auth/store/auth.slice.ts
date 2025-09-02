import { User } from '../../models/user';

export interface AuthSlice {
  readonly user: User | undefined;
  readonly isLoading: boolean;
}

export const authFeatureKey = 'auth';

export const initialAuthSlice: AuthSlice = {
  user: undefined,
  isLoading: false,
};
