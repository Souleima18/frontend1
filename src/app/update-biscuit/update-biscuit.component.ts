import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from '../model/marque.model';
import { Image } from '../model/image.model';
import { Biscuit } from '../model/biscuit.model';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-update-biscuit',
  templateUrl: './update-biscuit.component.html',
  styles: [
  ]
})
export class UpdateBiscuitComponent implements OnInit {

  currentBiscuit = new Biscuit();
  marques! : Marque[];
  updatedMaId! : number;
  myImage! :string;

  uploadedImage!: File;
  isImageUpdated: Boolean=false;




  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private biscuitService: BiscuitService) { }

 

    ngOnInit(): void {
      this.biscuitService.listeMarques().
      subscribe(mas => {this.marques = mas._embedded.marques;
      });
      this.biscuitService.consulterBiscuit(this.activatedRoute.snapshot.params['id'])
      .subscribe( bisc =>{ this.currentBiscuit = bisc;
      this.updatedMaId = bisc.marque.idMarque;
      } ) ;
      }

  updateBiscuit() {
    this.currentBiscuit.marque = this.marques.find(ma => ma.idMarque ==
      this.updatedMaId)!;
    this.biscuitService
      .updateBiscuit(this.currentBiscuit)
      .subscribe((bisc) => {
        this.router.navigate(['biscuits']);
      });
  }

 

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageBiscuit(){
    this.biscuitService
    .uploadImageBisc(this.uploadedImage,this.uploadedImage.name,this.currentBiscuit.idBiscuit)
        .subscribe( (img : Image) => {
              this.currentBiscuit.images.push(img);
           });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.biscuitService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentBiscuit.images 
        const index = this.currentBiscuit.images.indexOf(img, 0);
        if (index > -1) {
          this.currentBiscuit.images.splice(index, 1);
        }
      });
  }




}
