import { Language } from "../enums";

export interface ITranslatePipe {
    transform(value: string, language?: Language): string;
}
