import ShoppingCart from './ShoppingCart.js';
import PhoneViwer from './PhoneViwer.js';
import Filter from './Filter.js';
import PhonesCatalog from './PhonesCatalog.js';

import { getAll, getById } from '../api/phones.js';

export default class PhonesPage {
  constructor(element) {
    this.element = element;

    this.state = {
      phones: getAll(),
      selectedPhone: null,
    };

    this.render();

    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
    });
    this.initComponent(PhoneViwer, {
      phone: this.state.selectedPhone,
    });
    this.initComponent(ShoppingCart);
    this.initComponent(Filter);
  }

  initComponent(Constructor, props = {}) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"`);

    if (element) {
      new Constructor(element, props);
    }

    
  }

  render() {
   this.element.innerHTML = `
   <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        
      </section>
        <div data-component="Filter"></div>
      <section>
        <div data-component="ShoppingCart"></div>
      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10">
      ${ this.state.selectedPhone ? `
      <div data-component="PhoneViwer"></div>
      ` : `
      <div data-component="PhonesCatalog"></div>
      ` }
      
      
    </div>
  </div>
   `;
  }
}