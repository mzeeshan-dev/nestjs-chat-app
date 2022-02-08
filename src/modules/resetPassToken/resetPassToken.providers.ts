import { ResetPassToken } from "src/models/auth/resetPassToken.model";


export const resetPassTokenProviders = [
  {
    provide: 'PASSWORD_REPOSITORY',
    useValue: ResetPassToken,
  },
];