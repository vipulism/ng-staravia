import { HeaderService } from './../header/services/header.service';
import { HeaderData } from './../header/services/HeaderData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private headerService: HeaderService) {  
    
  } 

  ngOnInit() {
    const data:HeaderData = {
      subTitle:'We are a passionate digital design agency that specializes in beautiful and easy-to-use digital design & web development services.',
      title:[{lightTxt:'', boldTxt:'Blog'}],
      bgImg:'assets/img/bg3.jpg',
      supTitle:'',
      particels:0
    };

    this.headerService.setHdrData(data)
  }

}
