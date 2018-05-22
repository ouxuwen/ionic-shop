import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'number-input',
  templateUrl: 'number-input.html'

})
export class NumberInputComponent {
  _numVal: number = 0;


  constructor() {

  }

  @Input() min: number = 0; //最小数值
  @Input() max: number = 9999;//最大数值
  @Input() numVal: number;

  @Output() numValChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this._numVal = this.numVal;
  }

  checkNum() {

    if (this._numVal < this.min) {
      this._numVal = this.min;

    } else if (this._numVal > this.max) {
      this._numVal = this.max;

    }else if(!this._numVal){
      this._numVal = this.min;
    }
    this.numVal = this._numVal;
    this.numValChange.emit(this.numVal);
  }

  chaneNum(i) {
    this._numVal += i;
    this.checkNum();
  }
}
