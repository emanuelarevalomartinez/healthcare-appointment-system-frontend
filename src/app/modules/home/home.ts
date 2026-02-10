import { Component } from '@angular/core';
import { Auth } from "../auth/auth";

@Component({
  selector: 'app-home',
  imports: [Auth],
  templateUrl: './home.html',
})
export class Home {

}
