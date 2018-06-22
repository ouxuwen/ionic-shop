import { Component, Input } from '@angular/core';
import { API } from '../../app.config';
@Component({
  selector: 'image',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default: string = 'assets/images/default.png';

  constructor() {

  }

  @Input() src: string //要显示的图片

  ngOnInit() {
    let img = new Image();
    img.src = API.imgPrefix + this.src;
    img.onload = () => {
      //这里为了达到演示效果给了两秒的延迟，实际使用中不需要延迟
      setTimeout(() => {
        this.default =API.imgPrefix + this.src;
      }, 2000)
    }
  }
}
