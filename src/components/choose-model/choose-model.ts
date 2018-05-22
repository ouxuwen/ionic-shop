import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { PickerController } from 'ionic-angular';


@Component({
  selector: 'choose-model',
  template: `<span>球镜：{{selectValue.qiu.text }}</span> <span>柱镜：{{selectValue.zhu.text}}</span>`,
  styles: ['span { font-size:inherit; line-height: inherit; color:inherit; margin:0;}']
})


export class ChooseModelComponent {
  selectValue = {
    qiu: {
      value:null,
      text: ''
    },
    zhu: {
      value: null,
      text: ''
    }
  }
  @Input() selectList: any;
  @Input() placeholder: string;
  @Input() CancelText: string = '取 消';
  @Input() ConfirmText: string = '确 定';


  @Output() selectResult: EventEmitter<any> = new EventEmitter();
  @Output() ionCancel: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef, private pickerCtrl: PickerController) { }


  @HostListener('click') openSelectList() {

    let picker = this.pickerCtrl.create({
      buttons: [
        {
          text: this.CancelText,
          role: 'cancel',
          handler: () => this.ionCancel.emit(null)
        },
        {
          text: this.ConfirmText,
          handler: (data: any) => {
            this.selectValue.qiu = data.qiu;
            this.selectValue.zhu = data.zhu;
            this.selectResult.emit(this.selectValue);
          }
        }
      ],
      columns: [
        {
          name: 'qiu',
          align: 'center',
          selectedIndex: this.selectValue.qiu.value,
          options: this.selectList.qiu,
          prefix: "球 镜："
        },
        {
          name: 'zhu',
          align: 'center',
          selectedIndex: this.selectValue.zhu.value,
          options: this.selectList.zhu,
          prefix: "柱 镜："
        },
      ]
    });
    picker.present();

  }


}
