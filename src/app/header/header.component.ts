import { HeaderData } from './services/HeaderData';
import { HeaderService } from './services/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import 'particles.js/particles';

declare var particlesJS: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routerParamsSubs: Subscription;
  smallHeader: boolean = false;
  content: HeaderData;


  animationDelay = 2500;
  //loading bar effect
  barAnimationDelay = 3800;
  barWaiting = this.barAnimationDelay - 3000; //3000 is the duration of the transition on the loading bar - set in the scss/css file
  //letters effect
  lettersDelay = 50;
  //type effect
  typeLettersDelay = 150;
  selectionDuration = 500;
  typeAnimationDelay = this.selectionDuration + 800;
  //clip effect 
  revealDuration = 600;
  revealAnimationDelay = 1500;

  constructor(public router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService) { }



  headerBg() {
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

      if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
      }
    });


  }



  ngOnInit() {

    this.headerService.hdrContentObs.subscribe((data) => {
      this.content = data;

      if (this.content.particels) {
        const time = setTimeout(() => {
          this.headerBg();
          this.particlesInit();
          this.initHeadline(1);
          clearTimeout(time);
        }, 10);
      } else {
        const time = setTimeout(() => {
          this.headerBg();
          this.initHeadline(0);
          clearTimeout(time);
        }, 10);
      }

    });
  }


  particlesInit() {

    particlesJS('particles-js',

      {
        "particles": {
          "number": {
            "value": 50,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#888"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#888"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.8,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 3,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#888",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      }

    );
  }

  ngOnDestroy() {
    particlesJS.destroy();
  }




  initHeadline(isInit) {

    if(!isInit) return;

    //insert <i> element for each letter of a changing word
    const ltr = $('.cd-headline.letters').find('b');
    const line = $('.cd-headline');
    this.singleLetters(ltr);
    //initialise headline animation
    this.animateHeadline(line);
  }

  singleLetters($words) {
    $words.each(function () {
      var word = $(this),
        letters = word.text().split(''),
        selected = word.hasClass('is-visible');
      for (let i in letters) {
        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
      }
      var newLetters = letters.join('');
      word.html(newLetters).css('opacity', 1);
    });
  }

  animateHeadline($headlines) {
    var duration = this.animationDelay;
    const self = this;
    $headlines.each(function () {
      var headline = $(this);

      if (headline.hasClass('loading-bar')) {
        duration = this.barAnimationDelay;
        setTimeout(function () { headline.find('.cd-words-wrapper').addClass('is-loading') }, this.barWaiting);
      } else if (headline.hasClass('clip')) {
        var spanWrapper = headline.find('.cd-words-wrapper'),
          newWidth = spanWrapper.width() + 10
        spanWrapper.css('width', newWidth);
      } else if (!headline.hasClass('type')) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find('.cd-words-wrapper b'),
          width = 0;
        words.each(function () {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find('.cd-words-wrapper').css('width', width);
      };

      //trigger animation
      setTimeout(() => { self.hideWord(headline.find('.is-visible').eq(0)) }, duration);
    });
  }

  hideWord($word) {
    var nextWord = this.takeNext($word);
    const self = this;

    if ($word.parents('.cd-headline').hasClass('type')) {
      var parentSpan = $word.parent('.cd-words-wrapper');
      parentSpan.addClass('selected').removeClass('waiting');
      setTimeout(function () {
        parentSpan.removeClass('selected');
        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
      }, this.selectionDuration);
      setTimeout(function () { self.showWord(nextWord, self.typeLettersDelay) }, self.typeAnimationDelay);

    } else if ($word.parents('.cd-headline').hasClass('letters')) {
      var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
      this.hideLetter($word.find('i').eq(0), $word, bool, self.lettersDelay);
      this.showLetter(nextWord.find('i').eq(0), nextWord, bool, self.lettersDelay);

    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({ width: '2px' }, self.revealDuration, function () {
        self.switchWord($word, nextWord);
        self.showWord(nextWord);
      });

    } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
      $word.parents('.cd-words-wrapper').removeClass('is-loading');
      this.switchWord($word, nextWord);
      setTimeout(function () { self.hideWord(nextWord) }, self.barAnimationDelay);
      setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('is-loading') }, self.barWaiting);

    } else {
      this.switchWord($word, nextWord);
      setTimeout(function () { self.hideWord(nextWord) }, self.animationDelay);
    }
  }

  showWord($word, $duration?) {

    const self = this;
    if ($word.parents('.cd-headline').hasClass('type')) {
      this.showLetter($word.find('i').eq(0), $word, false, $duration);
      $word.addClass('is-visible').removeClass('is-hidden');
      
    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, self.revealDuration, function () {
        setTimeout(function () { self.hideWord($word) }, self.revealAnimationDelay);
      });
    }
  }

  hideLetter($letter, $word, $bool, $duration) {
    const self = this;
    $letter.removeClass('in').addClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function () { self.hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
    } else if ($bool) {
      setTimeout(function () { self.hideWord(this.takeNext($word)) }, self.animationDelay);
    }

    if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
      var nextWord = this.takeNext($word);
      this.switchWord($word, nextWord);
    }
  }

  showLetter($letter, $word, $bool, $duration) {

    const self = this;
    $letter.addClass('in').removeClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function () { self.showLetter($letter.next(), $word, $bool, $duration); }, $duration);
    } else {
      if ($word.parents('.cd-headline').hasClass('type')) { setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200); }
      if (!$bool) { setTimeout(function () { self.hideWord($word) }, self.animationDelay) }
    }
  }

  takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  takePrev($word) {
    return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  }

  switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  }


}
