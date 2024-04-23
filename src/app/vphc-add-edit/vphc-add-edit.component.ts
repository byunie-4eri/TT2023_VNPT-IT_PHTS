import { MapService } from './../map/map.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { VphcService } from '../services/vphc.service';


@Component({
  selector: 'app-vphc-add-edit',
  templateUrl: './vphc-add-edit.component.html',
  styleUrls: ['./vphc-add-edit.component.css']
})
export class VphcAddEditComponent implements OnInit{

  vphcForm: FormGroup;
  lnglat: any;

  constructor(
    private mapService: MapService,
    private _fb: FormBuilder, 
    private _vphcService: VphcService, 
    private _dialogRef: MatDialogRef<VphcAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ){
    this.vphcForm = this._fb.group({
      hoTen: '',
      tenCS: '',
      diaChi: '',
      noiDungVP: '',
      ngayVP: '',
      mucXuPhat: '',
    });
    this.lnglat = null;
  }


  ngOnInit(): void {
    this.vphcForm.patchValue(this.data);

    this.mapService.lnglat$.subscribe((lngLat) => {
      this.lnglat = lngLat;
      const coordinate = lngLat.split(',');
      // console.log(coordinate)
      this.vphcForm.patchValue({
        diaChi: JSON.stringify({
          type: 'point',
          coordinates: [parseFloat(coordinate[0]), parseFloat(coordinate[1])]
        })
      });
    });
} 

onFormSubmit(){
  if (this.vphcForm.valid){
    if(this.data){
      this._vphcService.updateVphc(this.data.id, this.vphcForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Chỉnh sửa vi phạm hành chính thành công!', 'Yeah');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error(err);
        },
      });
    } else {
      this._vphcService.addVphc(this.vphcForm.value).subscribe({
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
