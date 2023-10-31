import { Component, OnInit } from '@angular/core';
import { Biscuit } from '../model/biscuit.model';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  nomBiscuit! : string;
  biscuits!: Biscuit[];
  allBiscuits!: Biscuit[];
  searchTerm!: string;
  
  constructor(private biscuitService : BiscuitService) { }

  ngOnInit(): void {
    this.biscuitService.listeBiscuit().subscribe(biscs => {
      console.log(biscs);
      this.biscuits = biscs;
      });
      
  }

  rechercherBiscs(){
    this.biscuitService.rechercherParNom(this.nomBiscuit).
    subscribe(biscs => {
      console.log(biscs);
      this.biscuits=biscs;});
  }

  onKeyUp(filterText : string){
    this.biscuits = this.allBiscuits.filter(item =>
    item.nomBiscuit.toLowerCase().includes(filterText));
    }
    

}
