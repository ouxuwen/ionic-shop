import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { PickerController, Picker, PickerColumn, PickerCmp, PickerColumnCmp } from 'ionic-angular';
import { areasList } from './areas';

@Component({
  selector: 'select-address',
  template: `<p *ngIf='!selectValue'>请选择地址</p> <p *ngIf='selectValue'><span>{{selectValue.province.text}}</span><span>{{selectValue.city.text}}</span><span>{{selectValue.area.text}}</span></p>`,
  styles: ['span { font-size:inherit; line-height: inherit; color:inherit; margin:0;}']
})


export class SelectAddressComponent {
  private _provinceList: any = areasList[0].options;
  private _cityList: any;
  private _areaList: any;
  _pickerCmp: PickerCmp;
  _pickerColumnCmps: PickerColumnCmp[];

  @Input() selectValue: any = null;
  @Input() CancelText: string = '取 消';
  @Input() ConfirmText: string = '确 定';


  @Output() selectResult: EventEmitter<any> = new EventEmitter();
  @Output() ionCancel: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef, private pickerCtrl: PickerController) {
    this.filterCity();
  }


  @HostListener('click') openSelectList() {
    console.log('click')
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
            this.selectValue = data;
            console.log(this.selectValue);
            this.selectResult.emit(this.selectValue);
          }
        }
      ],
      columns: [
        {
          name: 'province',
          align: 'center',
          selectedIndex: this.selectValue ? this.getIndex('province', this._provinceList) : 0,
          options: this._provinceList,
        },
        {
          name: 'city',
          align: 'center',
          selectedIndex: this.selectValue ? this.getIndex('city', this._cityList) : 0,
          options: this._cityList
        },
        {
          name: 'area',
          align: 'center',
          selectedIndex: this.selectValue ? this.getIndex('area', this._areaList) : 0,
          options: this._areaList
        }
      ]
    });
    picker.ionChange.subscribe(() => {
      this.validate(picker);
    });
    picker.present().then(() => {
      this._pickerCmp = picker.instance;
      this._pickerColumnCmps = this._pickerCmp._cols.toArray();
      console.log(this._pickerCmp);
      console.log(this._pickerColumnCmps);

      this._pickerColumnCmps.forEach(col => col.lastIndex = -1)

      for (let i = 0; i < picker.getColumns().length; i++) {
        this.validate(picker);
      }
    });

  }


  getIndex(name: any, list: any) {
    let ind = 0;
    list.forEach((el, index) => {
      if (el.value === this.selectValue[name].value) {
        ind = index;
      }
    })
    return ind;
  }

  filterCity() {
    if (this.selectValue) {
      this._cityList = areasList[1].options.filter(el => {
        return el.parentVal === this.selectValue.province.value;
      })
      this._areaList = areasList[2].options.filter(el => {
        return el.parentVal === this.selectValue.city.value;
      })
    } else {
      this._cityList = areasList[1].options.filter(el => {
        return el.parentVal === this._provinceList[0].value;
      })
      this._areaList = areasList[2].options.filter(el => {
        return el.parentVal === this._cityList[0].value;
      })
    }

  }

  validate(picker: Picker) {
    let columns = picker.getColumns();
    console.log(columns)
    columns[1].options = areasList[1].options.filter(el => {
      return el.parentVal === this._provinceList[columns[0].selectedIndex].value;
    });
    let cityIndex = columns[1].selectedIndex > columns[1].options.length - 1 ? 0 : columns[1].selectedIndex;
    setTimeout(() => this._pickerColumnCmps[1].setSelected(cityIndex, 150), 0);
    columns[2].options  = areasList[2].options.filter(el => {
      return el.parentVal === columns[1].options[cityIndex].value;
    });
    setTimeout(() => this._pickerColumnCmps[2].setSelected(columns[2].selectedIndex > columns[2].options.length - 1 ? 0 : columns[2].selectedIndex, 150), 0);

  }
}
