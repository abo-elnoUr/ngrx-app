import { trigger, transition, style, animate } from "@angular/animations";

export const slideInAnimation =  trigger('routeAnimations',[
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('.7s cubic-bezier(0.68,-0.55,0.27,1.55)', style({ transform: 'translateX(0)', opacity: 1 })),
    ]),
  ])