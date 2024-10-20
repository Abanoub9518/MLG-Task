import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ListItemsComponent } from "./components/list-items/list-items.component";
import { LoaderComponent } from "./components/loader/loader.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ListItemsComponent, LoaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "MLG-Task";
}
