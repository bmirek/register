import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'etap'
})
export class EtapPipe implements PipeTransform {
    transform(param: any) {
        if (param === 'Page2') {
            return '2';
        } else if (param === 'Page3') {
            return '3';
        } else {
            return '1';
        }
    }
}
