import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api

  constructor(private httpClient: HttpClient) {
    
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }


//devuelve canciones trending
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}:any) =>{
        return data
      })
    )
  }

  //devuelve canciones random
  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap(({ data }: any) => this.skipById(data,2)),
      
      /**map(({dataRevertida}) =>{
        return dataRevertida.filter((track:TrackModel) => track._id !==1)
      })*/

      catchError((err)=> {
        const{status, statusText} = err;
        return of([])
      })
    )
  }
}
