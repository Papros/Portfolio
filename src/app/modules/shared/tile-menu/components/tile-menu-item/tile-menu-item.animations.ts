import { trigger, state, style, transition, animate } from '@angular/animations';
import { TileBehavior } from '@app/shared/tile-menu';

export enum AnimationState {
    PreAnimation = 'preAnimationState',
    PostAnimation = 'postAnimationState',
}

export const Animations = {
    cardFlip: trigger("cardFlip", [
        state(AnimationState.PreAnimation, style({
            transform: 'none',
        })),
        state(AnimationState.PostAnimation, style({
            transform: 'rotateY(180deg)',
        })),
        transition(`${ AnimationState.PreAnimation } => ${ AnimationState.PostAnimation }`, [
            animate('1500ms')
        ]),
        transition(`${ AnimationState.PostAnimation } => ${ AnimationState.PreAnimation }`, [
            animate('1000ms')
        ]),
    ])
}
