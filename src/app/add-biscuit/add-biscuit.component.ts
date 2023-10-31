import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marque } from '../model/marque.model';
import { Image } from '../model/image.model';
import { Biscuit } from '../model/biscuit.model';
import { BiscuitService } from '../services/biscuit.service';

@Component({
  selector: 'app-add-biscuit',
  templateUrl: './add-biscuit.component.html'
})
export class AddBiscuitComponent implements OnInit {

  newBiscuit = new Biscuit();
  marques! : Marque[];
  newIdMarque! : number;
  newMarque! : Marque;

  uploadedImage!: File;
  imagePath: any;

  
  constructor(private biscuitService: BiscuitService,
              private router : Router) { }

  ngOnInit(): void {

    this.biscuitService.listeMarques().
          subscribe(mas => {this.marques = mas._embedded.marques;
            console.log(mas);
        });

       
  }

 
 /*addBiscuit(){
    this.newBiscuit.marque = this.marques.find(ma => ma.idMarque == this.newIdMarque)!;
    this.biscuitService.ajouterBiscuit(this.newBiscuit)
                      .subscribe(bisc => {
                      console.log(bisc);
                      this.router.navigate(['biscuits']);
                      }); 
    }*/

 /* addBiscuit() {
    this.biscuitService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newBiscuit.image = img;
        this.newBiscuit.Marque = this.marques.find(ma => ma.idMarque== this.newIdMarque)!;
        
        this.biscuitService
          .ajouterBiscuit(this.newBiscuit)
          .subscribe(() => {
            this.router.navigate(['biscuits']);
          });
      });
  }*/

  addBiscuit() {
    this.newBiscuit.marque = this.marques.find(ma => ma.idMarque == this.newIdMarque)!;
    this.biscuitService
      .ajouterBiscuit(this.newBiscuit)
      .subscribe((bisc) => {
        this.biscuitService
          .uploadImageFS(this.uploadedImage,
            this.uploadedImage.name, bisc.idBiscuit)
          .subscribe((response: any) => { }
          );
        this.router.navigate(['biscuits']);
      });
  }

    
  


    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
      }




}
