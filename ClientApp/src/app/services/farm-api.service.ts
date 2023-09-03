import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../interfaces/animal.interface";

@Injectable({
  providedIn: 'root'
})
export class FarmApiService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.url = baseUrl + 'animals';
  }

  get(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.url);
  }

  create(animal: Animal): Observable<void> {
    return this.http.post<void>(this.url, animal);
  }

  delete(name: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + name)
  }
}
