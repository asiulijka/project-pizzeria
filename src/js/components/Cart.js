import {select, classNames, templates, settings} from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';


class Cart{
  constructor(element){
    const thisCart = this;

    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;

    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);

    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);

    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);

    thisCart.dom.address = this.dom.wrapper.querySelector(select.cart.address);
    thisCart.dom.phone = this.dom.wrapper.querySelector(select.cart.phone);
  }

  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function(){
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });

  }

  add(menuProduct){
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));

    thisCart.update();
  }

  update(){
    const thisCart = this;

    const deliveryFee = settings.cart.defaultDeliveryFee;
    let totalNumber = 0;
    let subtotalPrice = 0;

    for (let cartProduct of thisCart.products){
      totalNumber += cartProduct['amount'];
      subtotalPrice += cartProduct['price'];
    }

    if (subtotalPrice == 0){
      thisCart.totalPrice = subtotalPrice;
    } else {
      thisCart.totalPrice = subtotalPrice + deliveryFee;
    }

    // console.log(deliveryFee, totalNumber, subtotalPrice, thisCart.totalPrice);

    thisCart.dom.deliveryFee.innerHTML = deliveryFee;
    thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
    thisCart.dom.totalNumber.innerHTML = totalNumber;

    for (let cartTotalPrice of thisCart.dom.totalPrice){
      cartTotalPrice.innerHTML = thisCart.totalPrice;
    }

  }

  remove(cartProduct){
    const thisCart = this;

    // Usunięcie reprezentacji produktu z HTML-a,
    cartProduct.dom.wrapper.remove();

    // Usunięcie informacji o danym produkcie z tablicy thisCart.products.
    const cartProductIdx = thisCart.products.indexOf(cartProduct);
    thisCart.products.splice(cartProductIdx, 1);

    // Wywołać metodę update w celu przeliczenia sum po usunięciu produktu.
    thisCart.update();
  }

  sendOrder(){
    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.orders;

    // console.log(thisCart.dom.address.value);

    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: parseInt(thisCart.dom.totalPrice[0].innerHTML),
      subTotalPrice: parseInt(thisCart.dom.subtotalPrice.innerHTML),
      totalNumber: parseInt(thisCart.dom.totalNumber.innerHTML),
      deliveryFee: parseInt(thisCart.dom.deliveryFee.innerHTML),
      products: [],
    };
    // console.log(payload);
    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });

  }
}

export default Cart;
