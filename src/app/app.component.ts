import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {Bobs} from "./mock-bobs";
import {Bob} from "./bob";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIcon,
    MatMiniFabButton, MatSidenavContent, MatSidenav,
    RouterLinkActive, MatButton, MatSidenavContainer, RouterLink, MatCard, MatCardTitle,
    MatCardHeader, MatCardContent, MatList, MatListItem, MatLine, MatActionList, NgForOf, NgIf,
    FormsModule, MatFormField, MatInput, MatCardActions, JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bob-app';

  listName: string = 'Bob Directory';
  bobList: Bob[] = Bobs;
  currentBob = this.createEmptyBob();

  createBob(createdBob: Bob) {

    console.log("Creating Bob: " + JSON.stringify(createdBob));
    // Add new bob to list
    Bobs.push({
        uuid: Math.random(),
        firstName: createdBob.firstName,
        lastName: createdBob.lastName,
        age: createdBob.age})

    //Cleanup
    this.reset()
  }
  selectBob(selectedBob: Bob) {
    this.currentBob = {
      uuid: selectedBob.uuid,
      firstName: selectedBob.firstName,
      lastName: selectedBob.lastName,
      age: selectedBob.age
    };
  }

  updateBob(updatedBob: Bob) {
    let idx: number = this.bobList.findIndex(bobs => bobs.uuid == updatedBob.uuid);

    console.log("Update/Create index found: " + idx);
    if (idx !== -1) {
      this.bobList[idx] = {
        uuid: updatedBob.uuid,
        firstName: updatedBob.firstName,
        lastName: updatedBob.lastName,
        age: updatedBob.age
      }
    } else {
      this.createBob(updatedBob);
    }
  }

  deleteBob(deletedBob: Bob) {
    let idx: number = this.bobList.findIndex(bobs => bobs.uuid == deletedBob.uuid);

    console.log("Delete index found: " + idx);
    if (idx !== -1) {
      this.bobList.splice(idx, 1);
    }
  }

  reset() {
    this.currentBob = this.createEmptyBob();
  }

  private createEmptyBob(): Bob {
    return {
      uuid: -1,
      firstName: "",
      lastName: "",
      age: undefined
    };
  }
}
