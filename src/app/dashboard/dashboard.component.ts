import { Observable, Subject } from 'rxjs';
import { Component, ViewChild, VERSION } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild(MatSidenav)
  sidenav !: MatSidenav;

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

  
  

  // url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  // onSelect(event: any){
  //   let fileType = event.target.files[0].type;
  //   if(fileType.match(/image\/*/))
  //   {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event:any) => {
  //       this.url = event.target.result;
  //     };
  //   } else {
  //     window.alert('Please select correct image format');
  //   }

  // }

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
