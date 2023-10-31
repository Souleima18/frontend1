import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBiscuitComponent } from './add-biscuit/add-biscuit.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { BiscuitGuard } from './biscuit.guard';
import { BiscuitsComponent } from './biscuits/biscuits.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateBiscuitComponent } from './update-biscuit/update-biscuit.component';



const routes: Routes = [
  {path: "biscuits", component : BiscuitsComponent},
  {path: "add-biscuit", component : AddBiscuitComponent, canActivate:[BiscuitGuard]},
  {path: "updateBiscuit/:id", component: UpdateBiscuitComponent},
  {path: "rechercheParMarque", component : RechercheParMarqueComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeMarques", component : ListeMarquesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "", redirectTo: "biscuits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
