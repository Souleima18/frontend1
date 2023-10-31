import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { Biscuit } from '../model/biscuit.model';
import { BiscuitsComponent } from '../biscuits/biscuits.component';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: [
  ]
})
export class RechercheParMarqueComponent implements OnInit {
  IdMarque! : number;
  marques! : Marque[];
  biscuits! : Biscuit[];


  constructor(private biscuitService : BiscuitService) { }

  ngOnInit(): void {
    this.biscuitService.listeMarques().
      subscribe(mas => {this.marques = mas._embedded.marques;
      console.log(mas);
    });

  }

  onChange() {
    this.biscuitService.rechercherParMarque(this.IdMarque).
      subscribe(biscs =>{this.biscuits=biscs});

    }

}
