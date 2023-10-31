import { Marque } from "./marque.model";
import { Image } from "./image.model";

export class Biscuit {
    idBiscuit! : number;
    nomBiscuit! : string;
    prixBiscuit! : number;
    dateSortir! : Date ;
    marque! : Marque;
    image! : Image;
    imageStr!:string;

    images!: Image[];


    }