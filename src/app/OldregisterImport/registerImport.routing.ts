import { Routes } from '@angular/router';
import { RegisterImportComponent } from './registerImport.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const PagesRoutes: Routes = [
        
         {
            path: 'registerImport',
            component: RegisterImportComponent,
            canActivate:[AuthGuard]
        }
    
];