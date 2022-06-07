import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ADD, BASE, SHELF} from "./constants/routes.const";
import {AddComponent} from "./components/add/add.component";
import {ShelfComponent} from "./components/shelf/shelf.component";
import {CanAddGuard} from "./services/can-add.guard";

const routes: Routes = [
  {
    path: BASE,
    redirectTo: `/${SHELF}`,
    pathMatch: 'full',
  },
  {
    path: SHELF,
    component: ShelfComponent
  },
  {
    path: ADD,
    component: AddComponent,
    canActivate: [CanAddGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
