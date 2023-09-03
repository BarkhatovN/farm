import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { AddAnimalModalComponent } from "../add-animal-modal/add-animal-modal.component";
import { Animal } from "../../interfaces/animal.interface";
import { AnimalsService } from "../../services/animals.service";
import { EMPTY, Subject, switchMap, takeUntil } from "rxjs";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private animals: AnimalsService
  ) {
    animals.current$
      .pipe(takeUntil(this.destroy$))
      .subscribe(animals => {
        this.dataSource = animals;
        this.table?.renderRows();
      })
  }

  displayedColumns: string[] = ['name', 'delete',];
  dataSource: Animal[] = [];

  @ViewChild(MatTable) table: MatTable<Animal> | undefined;

  addData() {
    const ref = this.dialog.open(AddAnimalModalComponent);

    ref.afterClosed().pipe(
      takeUntil(this.destroy$),
      switchMap((animal: Animal) => {
        if (animal) {
          return this.animals.create(animal)
        }
        return EMPTY;
      })
    ).subscribe()
  }

  removeData(name: string) {
    this.animals.delete(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnInit(): void {
    this.animals.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
