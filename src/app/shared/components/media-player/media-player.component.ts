import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: 'https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc',
    album: 'Gioli y Assia',
    name: 'BEBE (Oficial)',
    url: 'http://localhost/track.mp3',
    _id: 1
  }

  ListObservers$:Array<Subscription> = []

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log('recibiendo cancion....', response);
        

      }
    )
    this.ListObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.ListObservers$.forEach(u => u.unsubscribe())
    console.log('SE DESTRUYÓ EL COMPONENTE')
  }
}
