import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Animal } from "../../interfaces/animal.interface";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-animal-modal',
  templateUrl: './add-animal-modal.component.html',
  styleUrls: ['./add-animal-modal.component.css']
})
export class AddAnimalModalComponent {
  animalName = this.fb.control<string>('', [Validators.required]);

  constructor(
    private fb: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<AddAnimalModalComponent, Animal | undefined>) {
  }

  onCancel() {
    this.dialogRef.close()
  }

  onCreate() {
    if (this.animalName.valid)
      this.dialogRef.close({ name: this.animalName.value })
  }
}
