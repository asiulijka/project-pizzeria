import {templates} from '../settings.js';

class Home{
  constructor(homeContainerElem){
    const thisHome = this;
    thisHome.render(homeContainerElem);

  }


  render(homeContainerElem){
    const thisHome = this;

    const generatedHTML = templates.homeWidget();
    thisHome.dom = {};
    thisHome.dom.wrapper = homeContainerElem;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }




}

export default Home;
