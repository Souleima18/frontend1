import { Injectable } from '@angular/core';
import { Marque } from '../model/marque.model';
import { Biscuit } from '../model/biscuit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marqueWrapped.model';
import { AuthService } from './auth.service';
import { apiURL } from '../config';
import { Image } from '../model/image.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class BiscuitService {
  
 
  apiURLCat: string = 'http://localhost:8080/biscuits/cat';

  biscuits! : Biscuit[]; //un tableau de biscuits
  //marques : Marque[];
 

  constructor(private http : HttpClient,
              private authService : AuthService) { 
    
  }

  listeBiscuit(): Observable<Biscuit[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
   
     return this.http.get<Biscuit[]>(apiURL+"/all",{headers:httpHeaders});

    }

    ajouterBiscuit( bisc: Biscuit):Observable<Biscuit>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
              return this.http.post<Biscuit>(apiURL+"/addbisc", bisc, {headers:httpHeaders});
      }
     
      
   
  supprimerBiscuit(id : number) {
       const url = `${apiURL}/delbisc/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.delete(url,  {headers:httpHeaders});
        }
      
   consulterBiscuit(id: number): Observable<Biscuit> {
          const url = `${apiURL}/getbyid/${id}`;
          console.log(url);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.get<Biscuit>(url,{headers:httpHeaders});
          }
  
    updateBiscuit(bisc :Biscuit) : Observable<Biscuit>    {
       console.log("biiiiiisc "+bisc);
        console.log(bisc.marque);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.put<Biscuit>(apiURL+"/updateprod", bisc, {headers:httpHeaders});
          }
  

         
       listeMarques():Observable<MarqueWrapper>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return  this.http.get<MarqueWrapper>(this.apiURLCat,{headers:httpHeaders});
        
            }     

       rechercherParMarque(idMarque: number): Observable<Biscuit[]> {
          const url = `${apiURL}/biscsma/${idMarque}`;
          return this.http.get<Biscuit[]>(url);
         } 

  rechercherParNom(nom: string):Observable< Biscuit[]> {
    const url = `${apiURL}/biscsByName/${nom}`;
    return this.http.get<Biscuit[]>(url);
    }

    ajouterMarque( ma: Marque):Observable<Marque>{
      return this.http.post<Marque>(this.apiURLCat, ma, httpOptions);
      }


      uploadImage(file: File, filename: string): Observable<Image>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${apiURL + '/image/upload'}`;
        return this.http.post<Image>(url, imageFormData);
        }


        loadImage(id: number): Observable<Image> {
          const url = `${apiURL + '/image/get/info'}/${id}`;
          return this.http.get<Image>(url);
          }


          uploadImageBisc(file: File, filename: string, idBisc:number): Observable<any>{
            const imageFormData = new FormData();
            imageFormData.append('image', file, filename);
            const url = `${apiURL + '/image/uplaodImageBisc'}/${idBisc}`;
            return this.http.post(url, imageFormData);
         }
            
         supprimerImage(id : number) {
          const url = `${apiURL}/image/delete/${id}`;
          return this.http.delete(url, httpOptions);
          }
          

          uploadImageFS(file: File, filename: string, idBisc : number): Observable<any>{
            const imageFormData = new FormData();
            imageFormData.append('image', file, filename);
            const url = `${apiURL + '/image/uploadFS'}/${idBisc}`;
            return this.http.post(url, imageFormData);
          }

         
            


     
          
      

 
}
