import { HeaderService } from './../header/services/header.service';
import { HeaderData } from './../header/services/HeaderData';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor( private headerService: HeaderService) { }



  ngOnInit() {

    const data:HeaderData = {
      subTitle:' ipsum dolor sit amet consectetur adipisicing elit.',
      title:[{lightTxt:'Home', boldTxt:'Page'}],
      bgImg:'assets/img/bg3.jpg',
      supTitle:'',
      particels:1
    };

    this.headerService.setHdrData(data);


  }

}
