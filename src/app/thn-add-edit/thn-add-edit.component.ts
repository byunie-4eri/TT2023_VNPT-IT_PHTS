import { ThnService } from './../services/thn.service';
import { MapService } from './../map/map.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-thn-add-edit',
  templateUrl: './thn-add-edit.component.html',
  styleUrls: ['./thn-add-edit.component.css']
})
export class ThnAddEditComponent implements OnInit {

  thnForm: FormGroup;
  lnglat: any;

  constructor(
    private mapService: MapService,
    private _fb: FormBuilder, 
    private _thnService: ThnService, 
    private _dialogRef: MatDialogRef<ThnAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ){
    this.thnForm = this._fb.group({
      loaidt: '',
      doiTuong: '',
      diaChi: '',
      soLuong: '',
      ngaytd: '',
      tinhHinhPT: '',
    });
    this.lnglat = null;
  }


  ngOnInit(): void {
    this.thnForm.patchValue(this.data);

    this.mapService.lnglat$.subscribe((lngLat) => {
      this.lnglat = lngLat;
      const coordinate = lngLat.split(',');
      // console.log(coordinate)
      this.thnForm.patchValue({
        diaChi: JSON.stringify({
          type: 'point',
          coordinates: [parseFloat(coordinate[0]), parseFloat(coordinate[1])]
        })
      });
    });
} 

onFormSubmit(){
  if (this.thnForm.valid){
    if(this.data){
      this._thnService.updateThn(this.data.id, this.thnForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Chỉnh sửa vi phạm hành chính thành công!', 'Yeah');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error(err);
        },
      });
    } else {
      this._thnService.addThn(this.thnForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Thêm vi phạm hành chính thành công!', 'Yeah');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error(err);
        },
      });
    }
    
  }
}

}
