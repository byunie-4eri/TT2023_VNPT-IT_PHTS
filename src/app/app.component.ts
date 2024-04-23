import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CsudAddEditComponent } from './csud-add-edit/csud-add-edit.component';
import { CsudService } from './services/csud.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';



import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

// -------


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id', 'tenCS', 'diaChi', 'loaiGiong', 'soLuong', 'ngayUong','tinhHinhPT', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _dialog: MatDialog, 
    private _csudService: CsudService,
    private _coreService: CoreService,
    private observer: BreakpointObserver
    ){}

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
      this.getCsudList();
  }

  openAddEditCsudForm(){
    const dialogRef = this._dialog.open(CsudAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCsudList();
        }
      }
    });
  }

  getCsudList(){
    this._csudService.getCsudList().subscribe({
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

  deleteCsud(id: number) {
    this._csudService.deleteCsud(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Đã xóa cơ sở ương dưỡng thành công!', 'Yeah');
        this.getCsudList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(CsudAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCsudList();
        }
      }
    });
  }
}
