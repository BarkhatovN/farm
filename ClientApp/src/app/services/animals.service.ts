import { Injectable } from '@angular/core';
import { FarmApiService } from "./farm-api.service";
import { Animal } from "../interfaces/animal.interface";
import { BehaviorSubject, EMPTY, map, Observable, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  current$ = new BehaviorSubject<Animal[]>([]);

  constructor(private api: FarmApiService) {
  }

  get(): Observable<void> {
    return this.api.get().pipe(
      tap(animals => this.current$.next(animals)),
      switchMap(() => EMPTY)
    );
  }

  create(animal: Animal): Observable<void> {
    return this.api.create(animal).pipe(
      switchMap(() => this.get())
    )
  }

  delete(name: string): Observable<void> {
    return this.api.delete(name).pipe(
      switchMap(() => this.get())
    )
  }
}
