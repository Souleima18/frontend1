import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styles: [
  ]
})
export class ListeMarquesComponent implements OnInit {

  marques!: Marque[];

  ajout:boolean=true;


  updatedMa:Marque = {"idMarque":0,"nomMarque":""};

  
  constructor(private biscuitService: BiscuitService) { }

  ngOnInit(): void {
    
    this.chargerMarques();
  }


  chargerMarques() {
    this.biscuitService.listeMarques().
      subscribe(mas => {this.marques = mas._embedded.marques;
      console.log(mas);
      });

  }

  marqueUpdated(ma:Marque) {
    console.log("marque reçue du composant updateMarque ",ma);
    this.biscuitService.ajouterMarque(ma).subscribe( ()=> this.chargerMarques());


  }

  updateMa(ma :Marque)
  {
    this.updatedMa = ma;
    this.ajout=false;
  }

}
