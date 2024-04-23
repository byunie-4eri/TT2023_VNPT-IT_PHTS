import { MapService } from './../map/map.service';
import { CsudService } from './../services/csud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-csud-add-edit',
  templateUrl: './csud-add-edit.component.html',
  styleUrls: ['./csud-add-edit.component.css']
})
export class CsudAddEditComponent implements OnInit{

  csudForm: FormGroup;
  lnglat: any;

  constructor(
    private mapService: MapService,
    private _fb: FormBuilder, 
    private _csudService: CsudService, 
    private _dialogRef: MatDialogRef<CsudAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ){
    this.csudForm = this._fb.group({
      tenCS: '',
      diaChi: '',
      loaiGiong: '',
      soLuong: '',
      ngayUong: '',
      tinhHinhPT: '',
    });
    this.lnglat = null;
  }

  ngOnInit(): void {
      this.csudForm.patchValue(this.data);

      this.mapService.lnglat$.subscribe((lngLat) => {
        this.lnglat = lngLat;
        const coordinate = lngLat.split(',');
        // console.log(coordinate)
        this.csudForm.patchValue({
          diaChi: JSON.stringify({
            type: 'point',
            coordinates: [parseFloat(coordinate[0]), parseFloat(coordinate[1])]
          })
        });
      });
  }

  onFormSubmit(){
    if (this.csudForm.valid){
      if(this.data){
        this._csudService.updateCsud(this.data.id, this.csudForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Chỉnh sửa cơ sở ương dưỡng thành công!', 'Yeah');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
              console.error(err);
          },
        });
      } else {
        this._csudService.addCsud(this.csudForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Thêm cơ sở ương dưỡng thành công!', 'Yeah');
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
