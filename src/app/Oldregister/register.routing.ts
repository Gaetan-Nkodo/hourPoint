import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const PagesRoutes: Routes = [
        
         {
            path: 'register',
            component: RegisterComponent,
            canActivate:[AuthGuard]
        }
    
];