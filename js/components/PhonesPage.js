import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import Filter from './Filter.js';
import ShoppingCart from './ShoppingCart.js';
import {getAllPhones, getPhoneById} from '../api/Phones.js';

export default class PhonesPage {
  constructor(element) {
    this.element = element;

    this.state = {
      phones: getAllPhones(),
      selectedPhone: null,
    }

    this.render();

  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    }

    this.render();
  }
  initializeComponent(Constructor, props) {
    const constructorName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${constructorName}"]`);

    if (element) {
      new Constructor(element, props);
    }
  }

  init() {
    this.initializeComponent(PhonesCatalog, {
      phones: this.state.phones,

      onPhoneSelected: (phoneId) => {
        this.setState({
          selectedPhone: getPhoneById(phoneId)
        });
      }
    });
    this.initializeComponent(PhoneViewer, {
      phone: this.state.selectedPhone,

      onBack: () => {
        this.setState({
          selectedPhone: null,
        });
      }
    });
    this.initializeComponent(Filter);
    this.initializeComponent(ShoppingCart);
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section class="Filter" data-component="Filter"></section>

          <section class="ShoppingCart" data-component="ShoppingCart"></section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
        ${this.state.selectedPhone ? 
          `<div data-component="PhoneViewer"></div>`
        : ` <div data-component="PhonesCatalog"></div>`}
        </div>
      </div>
    `;
  
    this.init();
  }
}