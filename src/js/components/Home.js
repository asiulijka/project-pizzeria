import {select, templates, settings} from '../settings.js';

class Home{
  constructor(homeContainerElem, app){
    const thisHome = this;
    thisHome.app = app;

    thisHome.render(homeContainerElem);
    thisHome.initListeners();
  }


  render(homeContainerElem){
    const thisHome = this;

    const generatedHTML = templates.homeWidget();
    thisHome.dom = {};
    thisHome.dom.wrapper = homeContainerElem;
    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.dom.carousel = thisHome.dom.wrapper.querySelector(select.home.carousel);
    thisHome.dom.orderButton = thisHome.dom.wrapper.querySelector(select.home.orderButton);
    thisHome.dom.bookingButton = thisHome.dom.wrapper.querySelector(select.home.bookingButton);

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);
  }

  initListeners(){
    const thisHome = this;
    const app = thisHome.app;

    thisHome.dom.orderButton.addEventListener('click', function(){
      const url = settings.url.host + '/#/' + settings.url.orders;
      window.location = url;
      app.activatePage('order');
    });

    thisHome.dom.bookingButton.addEventListener('click', function(){
      const url = settings.url.host + '/#/' + settings.url.booking;
      window.location = url;
      app.activatePage('booking');
    });
  }

}

export default Home;
