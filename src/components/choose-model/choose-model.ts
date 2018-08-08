import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { PickerController } from 'ionic-angular';


@Component({
  selector: 'choose-model',
  template: `<span>柱镜：{{selectValue.zhu.text}}</span> / <span>球镜：{{selectValue.qiu.text }}</span>`,
  styles: ['span { font-size:inherit; line-height: inherit; color:inherit; margin:0;}']
})


export class ChooseModelComponent {
  selectValue:any = {
    qiu:{text:''},
    zhu:{text:''}
  };
  @Input() defaultValue:any;
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
          handler: () => {
            this.ionCancel.emit(null);

          }
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
          name: 'zhu',
          align: 'center',
          selectedIndex: this.defaultValue? this.defaultValue.zhu.index:0,
          options: this.selectList.zhu,
          prefix: "柱 镜："
        },
        {
          name: 'qiu',
          align: 'center',
          selectedIndex:this.defaultValue? this.defaultValue.qiu.index:0,
          options: this.selectList.qiu,
          prefix: "球 镜："
        }
      ]
    });
    picker.present();

  }

  ngOnInit(){
    this.initData();
	}

  ngAfterContentChecked(){
    this.initData();
  }

  initData(){

    //是否有默认选中值，有则滑到默认值，没有=>是否有placeholder,有则显示placeholder text,没有则默认选中第一个
    if( this.defaultValue ){
      this.selectValue = this.defaultValue ;
    }
  }


}
