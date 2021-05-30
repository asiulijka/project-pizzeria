import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget{
  constructor(element){
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;

    // thisWidget.value = settings.amountWidget.defaultValue;

    thisWidget.getElements(element);
    // thisWidget.setValue(thisWidget.dom.input.value);
    thisWidget.initActions();
  }

  getElements(){
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  // setValue(value){
  //   const thisWidget = this;
  //
  //   const newValue = thisWidget.parseValue(value);
  //
  //   /* TODO Add validation - MOJ KOD*/
  //   // if (thisWidget.value !== newValue && !isNaN(newValue)){
  //   //   if (newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax){
  //   //     thisWidget.value = newValue;
  //   //     thisWidget.announce();
  //   //   }
  //   // }
  //
  //   // KOD KODILLI
  //   // if(newValue != thisWidget.value && newValue >=settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax){
  //   //   thisWidget.value=newValue;
  //   //   thisWidget.announce();
  //   // }
  //
  //
  //   // FILM KODILLI
  //   if(newValue != thisWidget.value && thisWidget.isValid(newValue)){
  //     thisWidget.value = newValue;
  //     thisWidget.announce();
  //   }
  //
  //   thisWidget.renderValue();
  // }

  isValid(value){
    return !isNaN(value)
      && value >= settings.amountWidget.defaultMin
      && value <= settings.amountWidget.defaultMax;
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
  }


  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function(){
      thisWidget.setValue(thisWidget.dom.input.value);
    });
    thisWidget.dom.linkDecrease.addEventListener('click', function(){
      thisWidget.setValue(thisWidget.value-1);
    });
    thisWidget.dom.linkIncrease.addEventListener('click', function(){
      thisWidget.setValue(thisWidget.value+1);
    });
  }


}

export default AmountWidget;
