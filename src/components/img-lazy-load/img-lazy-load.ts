import { Component, Input } from '@angular/core';
import { URL } from '../../app.config';
@Component({
  selector: 'image',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default: string = 'assets/imgs/no03.png';

  constructor() {

  }

  @Input() src: string //要显示的图片

  ngOnInit() {
    let img = new Image();
    if (this.src) {
      if (this.src.indexOf('http') > -1) {
        img.src = this.src;
      } else if (this.src.indexOf('base64,') > -1) {
        img.src = this.src;
      }
      else {
        img.src = URL.imgPrefix + this.src;
      }

      img.onload = () => {
        //这里为了达到演示效果给了两秒的延迟，实际使用中不需要延迟

        this.default = img.src;

      }
    }

  }
}
