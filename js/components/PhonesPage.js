import Component from '../Component.js';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import Filter from './Filter.js';
import ShoppingCart from './ShoppingCart.js';
import {getAllPhones, getPhoneById} from '../api/Phones.js';

export default class PhonesPage extends Component {
  constructor(element) {
    super(element);

    this.state = {
      phones: getAllPhones(),
      selectedPhone: null,
      items: {
        'sadf': 1,
        'sdasd': 2,
      }
    }

    this.render();
  }

  addItem(phoneId) {
    const oldItems = this.state.items;
    const items = {
      ...oldItems,
      [phoneId]: oldItems[phoneId] ? oldItems[phoneId] + 1 : 1
    }
    this.setState({items: items});
  }

  removeItem(itemToRemove) {
    const newItems = this.state.items;
    delete newItems[itemToRemove]
    this.setState({
      items: newItems,
    });
  }

  init() {
    this.initializeComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: (phoneId) => this.setState({selectedPhone: getPhoneById()}),
      onAdd: (phoneId) => this.addItem(phoneId),
    });
    this.initializeComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      onBack: () => this.setState({selectedPhone: null}),
      onAdd: (phoneId) => this.addItem(phoneId),
    });
    this.initializeComponent(Filter);
    this.initializeComponent(ShoppingCart, {
      items: this.state.items,
       onRemove: (itemToRemove) => this.removeItem(itemToRemove),
    });
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