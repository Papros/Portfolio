import { Pipe, PipeTransform } from "@angular/core";
import { Language } from "../enums";
import { ITranslatePipe } from "../interfaces";

@Pipe({
    pure: true,
    name: 'translate',
})
export class TranslatePipe implements ITranslatePipe, PipeTransform {
    public constructor(

    ){}

    public transform(value: string, language?: Language): string {
        let translation = '';
        
        return translation;
    }
}