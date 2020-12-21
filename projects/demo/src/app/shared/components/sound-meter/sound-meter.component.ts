import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SoundMeter } from '../../../core/sound-meter';
import { SoundMeterService } from './sound-meter.service';

@Component({
  selector: 'app-sound-meter',
  templateUrl: './sound-meter.component.html',
  styleUrls: ['./sound-meter.component.css']
})
export class SoundMeterComponent implements AfterViewInit, OnDestroy {

  @ViewChild("meter") meterRef!: ElementRef;
  private soundMeter!: SoundMeter;
  private subscription?: Subscription;

  constructor(private meterStateService: SoundMeterService) { }

  ngAfterViewInit() {

    this.subscription = this.meterStateService.mediaStream$.subscribe((stream: MediaStream) => {

      this.soundMeter = new SoundMeter(new AudioContext());
      this.soundMeter.connect(stream,
        (instant) => this.meterRef ? this.meterRef.nativeElement.value = instant : null,
        (error) => console.debug('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
      );

    });

  }

  ngOnDestroy(): void {
    if (this.soundMeter) {
      this.soundMeter.context.close();
    }
    this.subscription?.unsubscribe();
  }

}