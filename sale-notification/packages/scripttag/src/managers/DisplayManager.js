import React from 'preact/compat';
import {render} from 'preact';
import {insertAfter} from '../helpers/insertHelpers';
import {NotificationPopup} from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  initialize({notifications, settings}) {

    // Todo: With notification and settings, update the displaying logic
    this.insertContainer();
    this.showPopup({notifications, settings})
  }

  showPopup({notifications, settings, index = 0}) {
    const {firstName, city, country, productName, timestamp, productImage} = notifications[index];

    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        productImage={productImage}
        timestamp={timestamp}
        settings={settings}
      />,
      container);

    setTimeout(() => {
      this.fadeOut()
      setTimeout(() => {
        if (notifications[index+1]) {
          this.showPopup({notifications, settings, index: index + 1})
        }
      }, settings.popsInterval * 1000)
    }, settings.displayDuration * 1000)
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
