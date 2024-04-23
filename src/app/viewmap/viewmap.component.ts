import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.css']
})
export class ViewmapComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver){
    
  }

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


}
