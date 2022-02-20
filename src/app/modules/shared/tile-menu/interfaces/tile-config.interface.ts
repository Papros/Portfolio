import { TileBehavior } from "../enums/tile-behavior.enum";

export interface ITileConfig {
    targetURL: string;
    imageURL: string;
    background: string;
    text: string;
    row: number;
    column: number;
    width: number;
    height: number;
    iconURL?: string;
    isVisible?: boolean;
    isActive?: boolean;
    behavior?: TileBehavior; 
}
