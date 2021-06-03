import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';


class Booking{
  constructor(bookingContainerElem){
    const thisBooking = this;
    thisBooking.render(bookingContainerElem);
    thisBooking.initWidgets();
  }

  render(bookingContainerElem){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingContainerElem;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);

    thisBooking.dom.pickDate = document.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.pickTime = document.querySelector(select.widgets.hourPicker.wrapper);
  }


  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.dom.peopleAmount.addEventListener('click', function(){});

    thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener('click', function(){});

    thisBooking.pickDateWidget = new DatePicker(thisBooking.dom.pickDate);
    thisBooking.dom.pickDate.addEventListener('click', function(){});

    thisBooking.pickTimeWidget = new HourPicker(thisBooking.dom.pickTime);
    thisBooking.dom.pickTime.addEventListener('click', function(){});
  }

}

export default Booking;
