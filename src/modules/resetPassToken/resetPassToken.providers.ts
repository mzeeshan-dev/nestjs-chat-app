import { ResetPassToken } from "src/models/resetPassToken/resetPassToken.model";


export const resetPassTokenProviders = [
  {
    provide: 'PASSWORD_REPOSITORY',
    useValue: ResetPassToken,
  },
];