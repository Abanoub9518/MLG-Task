import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddItem, Item } from "../models/item.model";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  baseUrl: string = "https://api.restful-api.dev/";

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/objects`);
  }

  addItem(item: AddItem): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/objects`, item, {
      observe: "response",
    });
  }
  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/objects/${id}`, {
      observe: "response",
    });
  }
}
