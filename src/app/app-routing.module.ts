import { CompiladorComponent } from './compilador/compilador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',
    redirectTo: '/compilador',
    pathMatch: 'full'
  },
  { path: 'compilador',        component: CompiladorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
