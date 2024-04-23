import { ThnService } from './../services/thn.service';
// import { Component } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
// import { CoreService } from './core/core.service';



import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { CoreService } from '../core/core.service';
import { VphcService } from '../services/vphc.service';
import { VphcAddEditComponent } from '../vphc-add-edit/vphc-add-edit.component';
import { ThnAddEditComponent } from '../thn-add-edit/thn-add-edit.component';

@Component({
  selector: 'app-thnform',
  templateUrl: './thnform.component.html',
  styleUrls: ['./thnform.component.css']
})
export class ThnformComponent {

  [x: string]: any;
  displayedColumns: string[] = ['id', 'loaidt', 'doiTuong', 'diaChi', 'soLuong', 'ngaytd','tinhHinhPT', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _dialog: MatDialog, 
    private _thnService: ThnService,
    private _coreService: CoreService,
    private observer: BreakpointObserver
    ){}

    url="./assets/images/Logo.png";
  onselectFile(e: any){
    let fileType = e.target.files[0].type;
    if(fileType.match(/image\/*/)){
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload =(event:any)=>{
        this.url= event.target.result;
      };
    } else {
      window.alert("Vui lòng chọn ảnh đúng định dạng!")
    }
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close()
      }else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  ngOnInit(): void {
    this.getThnList();
  }

  openAddEditThnForm(){
    const dialogRef = this._dialog.open(ThnAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getThnList();
        }
      }
    });
  }

  getThnList(){
    this._thnService.getThnList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteThn(id: number) {
    this._thnService.deleteThn(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Đã xóa vi phạm hành chính thành công!', 'Yeah');
        this.getThnList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(ThnAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getThnList();
        }
      }
    });
  }

}
