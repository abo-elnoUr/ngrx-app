import { Injectable } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  backInRightAnimation() {
    return trigger('backInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.68,-0.55,0.27,1.55)', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]);
  }
}
