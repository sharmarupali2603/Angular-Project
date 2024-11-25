import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { every, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,WebcamModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAssign';
stream:any=null;
status:any=null;
trigger:Subject<void>=new Subject();
previewImage:string='';
buttonLabel:string='Capture Image';
get $trigger(): Observable<void>{
  return this.trigger.asObservable();
}

snapshot(event:WebcamImage){
  console.log(event);
this.previewImage=event.imageAsDataUrl;
this.buttonLabel="Re Capture Image"
}
  checkPermission(){
    navigator.mediaDevices.getUserMedia({
     video:{
      width:500,
      height:400
    }}
).then((res) =>{
console.log("response,",res);
this.stream=res;
this.status="Camera is accessing"
this.buttonLabel="Capture Image"
    }).catch(err=>{
      console.log("error,",err);
      this.status=err;
      if(err?.message=="Permission denied"){
        this.status="Permission denied please try again by approving the camera access."
      }else{
        this.status="You may not having camera in your device. Please try again...."
      }
    })
  }

  captureImage(){
this.trigger.next();

}
}
