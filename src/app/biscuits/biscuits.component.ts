import { Component, OnInit } from '@angular/core';
import { Image } from '../model/image.model';
import { Biscuit } from '../model/biscuit.model';
import { AuthService } from '../services/auth.service';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-biscuits',
  templateUrl: './biscuits.component.html'
})
export class BiscuitsComponent implements OnInit {

    biscuits? : Biscuit[]; //un tableau de biscuits

    apiurl:string='http://localhost:8080/biscuits/api';

  constructor(private biscuitService: BiscuitService,
              public authService: AuthService) {
   //this.biscuits=[];
     }

  ngOnInit(): void {

    this.chargerBiscuits();
  }

 /* chargerBiscuits(){
    this.biscuitService.listeBiscuit().subscribe(biscs => {
    //  console.log(biscs);
      this.biscuits = biscs;

      this.biscuits.forEach((bisc) => {
        bisc.imageStr = 'data:' + bisc.images[0].type + ';base64,' +  bisc.images[0].image;
        }); 

      });
  }*/

  chargerBiscuits(){
this.biscuitService.listeBiscuit().subscribe(biscs => {
this.biscuits = biscs;
});
}

supprimerBiscuit(b: Biscuit)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.biscuitService.supprimerBiscuit(b.idBiscuit).subscribe(() => {
        console.log("biscuit supprimé");
        this.chargerBiscuits();     
      
});
}
 
 

}
