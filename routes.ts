import { Routes } from 'nest-router';
import { AppModule } from 'src/app.module';

export const routes: Routes = [
  {
    path: '/',
    module: AppModule,
  },
];