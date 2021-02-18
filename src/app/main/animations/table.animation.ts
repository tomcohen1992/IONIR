import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const Animations = {
  listAnimation: [
    trigger('RowAnimation', [
      transition('* <=> *', [style({ opacity: 0 }), animate('1000ms', style({ opacity: 1 }))])
    ]),
    trigger('tableAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.6s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
};
