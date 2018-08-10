import { Component, Input } from '@angular/core';

@Component({
  selector: 'star',
  templateUrl: 'star.html'

})
export class StarComponent {

  constructor() {

  }

  @Input() stars: number = 0; //最小数值

}
