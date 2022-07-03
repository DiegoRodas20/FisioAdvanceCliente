import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UbigeoService {
    
    constructor(private http: HttpClient) {}
    url:string;
    url_base: string = 'https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=distritos-peru&q=&rows=10&facet=nombdep&facet=nombprov&facet=nombdist';
    public getProvincia(departamento:string,provincia : string): Observable<any> {
        // let url='https://bogota-laburbano.opendatasoft.com//api/records/1.0/search/?dataset=distritos-peru&q=&facet=nombdep&facet=nombprov&refine.nombdep='+ 'LIMA';
        //let url='https://bogota-laburbano.opendatasoft.com/api/records/1.0/search/?dataset=distritos-peru&q=&facet=nombdep&facet=nombprov&refine.nombdep=' + 'LIMA' +'&refine.nombprov=' + 'LIMA';
        // let url_base =
        (departamento)
        if(departamento!=''){
            this.url=this.url_base+'&refine.nombdep='+departamento
            
            if(provincia!=''){this.url=this.url_base+'&refine.nombdep='+departamento+'&refine.nombprov='+provincia
            }
        }
        (this.url);
        return this.http.get(this.url);
    }

    public getDepartamento(): Observable<any> {
        return this.http.get(this.url_base);
    }
}


// http://portal.apci.gob.pe/index.php/registros-de-proyectos/item/449-departamento-provincia-distrito


