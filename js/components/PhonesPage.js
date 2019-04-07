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
      basketItems: [],
    };

    this.render();
  }

  initComponent(Constructor, props = {}) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"`);

    if (element) {
      new Constructor(element, props);
    }

    
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
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

  this.initComponent(PhonesCatalog, {
    phones: this.state.phones,
    onPhoneSelected: (phoneID) => {
      this.setState({
        selectedPhone: getById(phoneID),
      });
    },
    onPhoneAdded: (phoneId) => {
      this.state.basketItems.push(phoneId);
      this.setState({
        basketItems: this.state.basketItems,
      })
    }
  });

  this.initComponent(PhoneViwer, {
    phone: this.state.selectedPhone,
    onBack: () => {
      this.setState({
        selectedPhone: null,
      });
    },
    onPhoneAdded: (phoneId) => {
      this.state.basketItems.push(phoneId);
      this.setState({
        basketItems: this.state.basketItems,
      })
    },
  });

  this.initComponent(ShoppingCart, {
    basketItems: this.state.basketItems,
    onDelete: (index) => {
      this.state.basketItems.splice(index,1);
      this.setState({
        basketItems: this.state.basketItems,
      })
    }
  });
  this.initComponent(Filter);
  }
}