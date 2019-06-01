import { HeaderData } from './../header/services/HeaderData';
import { HeaderService } from './../header/services/header.service';
import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import 'isotope-layout/js/isotope';
import Isotope from 'isotope-layout/dist/isotope.pkgd';
// import Isotope from 'isotope-layout';
// declare var Isotope: any;  

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private  headerService: HeaderService) { }


  isotopeInit(){

    const gallery = <HTMLDivElement>document.querySelector('.gallery');

    const iso = new Isotope(gallery, {
      itemSelector: '.items'
    });


    // filter items on button click
    // $('.filtering').on( 'click', 'span', function() {

    //     var filterValue = $(this).attr('data-filter');

    //     iso({ filter: filterValue });
    //     // $gallery.isotope({ filter: filterValue });

    // });

    // $('.filtering').on( 'click', 'span', function() {

    //     $(this).addClass('active').siblings().removeClass('active');

    // });
  }



  ngOnInit() {

    const data:HeaderData = {
      subTitle:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      title:[{lightTxt:'Product &', boldTxt:'Services'}],
      bgImg:'assets/img/bg3.jpg',
      supTitle:'',
      particels:0
    };

    this.headerService.setHdrData(data)

    setTimeout(() => {
      this.isotopeInit();
    }, 150);
  }

}
