import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
  }

    GoToPage(page:string, input:string) {
        if(input === null) {
            this.router.navigate(['/page']);
        }
    }

  ngOnInit() {
      //// This code help to refresh Home Page.
      if( window.localStorage ) {
        if( !localStorage.getItem('firstLoad') ) {
            localStorage['firstLoad'] = true;
            window.location.reload();
        }
        else {
            localStorage.removeItem('firstLoad');
        }
    }
// Implemetion reference: https://juejin.im/post/5aeef41cf265da0ba0630de0

    const helper = {
        getDelta(event) {
            if(event.wheelDelta) {
                return event.wheelDelta;
            } else {
                return -event.detail;
            }
        },
        throttle(method, delay, context) {
            let inThrottle = false;
            return function() {
                if (!inThrottle) {
                    inThrottle = true;
                    method.apply(context, arguments);
                    setTimeout(() => {
                        inThrottle = false;
                    }, delay);
                }
            }
        },
        debounce(method, delay, context) {
            let inDebounce;
            return function() {
                clearTimeout(method.inDebounce);
                inDebounce = setTimeout(() => {
                    method.apply(context, arguments);
                }, delay);
            }
        }
    }
    class ScrollPages {
      currentPageNumber: any;
      totalPageNumber: any;
      pages: any;
      viewHeight: number;
      navDots: any;
      startY: number;
        constructor(currentPageNumber, totalPageNumber, pages){
            this.currentPageNumber = currentPageNumber;
            this.totalPageNumber = totalPageNumber;
            this.pages = pages;
            this.viewHeight = document.documentElement.clientHeight;
        }
        mouseScroll(event) {
            let delta = helper.getDelta(event);
            if (delta < 0 && !event.ctrlKey) {
                this.scrollDown();
            } else if (delta > 0 && !event.ctrlKey) {
                this.scrollUp();
            }
        }
        scrollDown() {
            if (this.currentPageNumber !== this.totalPageNumber){
                this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
                this.currentPageNumber++;
                this.textFadeInOut();
            }
        }
        scrollUp() {
            if (this.currentPageNumber !== 1) {
                this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
                this.currentPageNumber--;
                this.textFadeInOut();
            }
        }
        resize() {
            this.viewHeight = document.documentElement.clientHeight;
            this.pages.style.height = this.viewHeight + 'px';
            this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
        }
        textFadeInOut() {
            const containersDomA = document.getElementsByClassName('TextFadeInOut');
            let textContainers = Array.prototype.slice.call(containersDomA);
            textContainers.forEach((e) => {
                e.classList.remove('In-Sight');
            });
            let textContainerInSight = textContainers[this.currentPageNumber-1];
            textContainerInSight.classList.add('In-Sight')
        }
        init() {
            let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
            let handleResize = helper.debounce(this.resize, 500, this);
            this.pages.style.height = this.viewHeight + 'px';
            this.textFadeInOut();
            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                document.addEventListener('wheel', handleMouseWheel);
            } else {
                document.addEventListener('DOMMouseScroll', handleMouseWheel);
            }
            document.addEventListener('touchstart', (event) => {
                this.startY = event.touches[0].pageY;
            });
            document.addEventListener('touchend', (event) => {
                let endY = event.changedTouches[0].pageY;
                if (this.startY - endY < 0) {
                    this.scrollUp();
                }
                if (this.startY - endY > 0) {
                    this.scrollDown();
                }
            });
            document.addEventListener('touchmove', (event) => {
                event.preventDefault();
            });
            window.addEventListener('resize', handleResize);
            document.addEventListener('keydown', (event) => {
                if (event.keyCode === 38) {
                    this.scrollUp();
                } else if (event.keyCode === 40) {
                    this.scrollDown();
                }
            });
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
      let start = new ScrollPages(1,4,document.getElementById('Home'));
      start.init()
      ;
    })
  }
}
