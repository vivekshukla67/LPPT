import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state
} from '@angular/animations';

export const routeAnimate = trigger('helloAnchor', [
    transition('* <=> *', [
        style({ opacity: 1 }),
        animate('1s')
    ])
]);

export const routeAnimateDetail = trigger('detailSection', [
    transition('* <=> *', [
        // style({ transform: 'translateX(-50%)' }),
        style({ opacity: 0 }),
        animate('1s')
    ])
]);

export const headerNameAnimate = trigger('LeftToRight', [
    transition(':enter', [
        style({ transform: 'translateX(-10%)' }),
        animate('0.3s ease-out')
    ])
]);

export const headerAnimate = trigger('TopToBottom', [
    transition('* <=> *', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.3s')
    ])
]);

export const headerAnimateRightToLeft = trigger('RightToLeft', [
    transition('* <=> *', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s')
    ])
]);



export const headerAnimate1 = trigger('BottomToTop', [
    transition(':enter', [
        style({ transform: 'translateY(10%)' }),
        animate('0.3s')
    ])
]);

export const formSectionAnimate = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s')
    ])
]);

export const searchInAnimation = trigger('animationFadeInOut', [
    state('void', style({
        opacity: 0,
        transform: 'scale(1.5,1.5)'
    })),
    transition('void => *', animate('0.2s linear'))
]);

export const searchInAnimation1 = trigger('hiddenVisibility', [
    state('void', style({
        opacity: 0
    })),
    transition('* => void', animate('0.3s ease-out'))
]);

// export const searchOutAnimation = trigger('animationFadeInOut', [
//         state('init', style({ opacity: 1 })),
//         state('destroy', style({ opacity: 0 })),
//         transition('init => destroy', animate('0.3s'))
//     ]);


export const listSectionAnimation = trigger('animationBelowUp', [
    state('void', style({
        opacity: 0,
        transform: 'translateY(25%)'
    })),
    transition('void <=> *', animate('0.3s ease-out')),
]);


export const detailSectionInit = trigger('animationfadeIn', [
    transition('* <=> *', [
        // style({ transform: 'translateX(-50%)' }),
        style({ opacity: 0 }),
        animate('0.5s')
    ]),
    transition('void <=> *', [
        style({ opacity: 0 }),
        animate('0.5s')
    ]),
    transition('* => void, :leave', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s')
    ])
]);
export const routeAnimate2 = trigger('animationBelowUp', [
    state('void', style({
        opacity: 0,
        transform: 'translateY(5%)'
    })),
    transition('void <=> *', animate('0.3s ease-out')),
])

export const routeAnimate3 = trigger('animationBelowUp', [
    state('void', style({
        transform: 'translateY(100%) rotate(360deg)',
        opacity: 0
    })),
    transition('void <=> *', animate(1000)),
]);

export const detailSectionDestroy = trigger('animationfadeOut', [
    state('init', style({ opacity: 1 })),
    state('destroy', style({ opacity: 0 })),
    transition('init => destroy', animate('0.3s'))
]);

export const slideInAnimation = trigger('routeAnimations', [
    transition('roles <=> features', [
        style({ backgroundColor: 'red' }),
        query(':enter, :leave', [
            style({
                transform: 'translateX(0%)',
                backgroundColor: 'black'
            })
        ], { optional: true }),
        query(':enter', [
            style({ transform: 'translateX(-100%)' })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
            ])
        ]),
        query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('200ms ease-out', style({ left: '100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ])
]);

export const fadeIn = trigger('simpleFadeAnimation', [

    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({opacity: 1})),

    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [
      style({opacity: 0}),
      animate(1500 )
    ]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave',
      animate(1500, style({opacity: 0})))
  ])