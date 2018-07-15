import { Component, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'coustom-action',
    templateUrl: 'coustom-action.html'
})
export class CoustomActionComponent {

    @Input() isHide: boolean = true;
    @Input() title: string;
    @Output() isHideChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    close(e) {
        e.stopPropagation();
        this.isHide = true;
        this.isHideChange.emit(this.isHide);
    }
    constructor() {

    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        console.log( this.isHide )
        if ('isHide' in changes) {
            this.isHide = changes['isHide'].currentValue;
        }
    }

}
