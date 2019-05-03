import { HeaderService } from './../header/services/header.service';
import { HeaderData } from './../header/services/HeaderData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {

    const data:HeaderData = {
      subTitle:'We are mainly engaged in supply & repair of spares of Russian Origin Aircrafts, Helicopters, RADAR & communication, GSE/GHE, Mechanical Heavy Machinery and Tools & testers.',
      title:[{lightTxt:'', boldTxt:'STAR AVIATION INDIA'}],
      bgImg:'assets/img/bg3.jpg',
      supTitle:'',
      particels:0
    };

    this.headerService.setHdrData(data)


  }

}
