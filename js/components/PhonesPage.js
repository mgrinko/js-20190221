import Component from '../Component.js';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import ShoppingCart from './ShoppingCart.js';
import Filter from './Filter.js';
import {getAllPhones, getPhoneById} from '../api/Phones.js';

export default class PhonesPage extends Component {
  constructor(element) {
    super(element);

    this.state = {
      phones: [],
      selectedPhone: null,
      items: {},
    }

    this.onPhoneSelected = (phoneId) => this.selectedPhone(phoneId);
    this.onAdd = (phoneId) => this.addItem(phoneId);
    this.onBack =  () => this.unselectedPhone();
    // this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);
    
    this.render();

    this.loadPhones();
  }

  async loadPhones() {
    const phones = await getAllPhones();

    this.setState({phones: phones})
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
    delete newItems[itemToRemove];

    this.setState({
      items: newItems,
    });
  }

  async selectedPhone(phoneId) {
    const phone = await getPhoneById(phoneId)
      
    this.setState({selectedPhone: phone,})
  }

  unselectedPhone() {
    this.setState({
      selectedPhone: null,
    })
  }

  init() {
    this.initializeComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: this.onPhoneSelected,
      onAdd: this.onAdd,
    });
    this.initializeComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      onBack:this.onBack,
      onAdd: this.onAdd,
    });
    this.initializeComponent(ShoppingCart, {
      items: this.state.items,
       onRemove: (itemToRemove) => this.removeItem(itemToRemove),
    });
    this.initializeComponent(Filter);
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