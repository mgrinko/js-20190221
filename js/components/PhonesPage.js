import Component from '../Component.js'
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import ShoppingCart from './ShoppingCart.js';
import Filter from './Filter.js';
import {getAll, getById} from "../api/PhonesDataServer.js";


export default class PhonesPage extends Component{
  constructor(element) {
    super(element)

    this.state = {
      phones: [],
      selectedPhone: null,
      items: {},
    }

    this.onPhoneSelected = (phoneId) => this.selectPhone(phoneId);
    this.onAdd = (phoneId) => this.addItem(phoneId);
    this.onBack = () => this.unSelectPhone();
    // this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);

    this.render();

    this.loadPones();
  }

  async loadPones() {
    const phones = await getAll();
    this.setState({phones})
  }
  addItem(item) {
    const oldItems = this.state.items;
    const items = {
      ...oldItems,
      [item]: oldItems[item] ? oldItems[item] + 1: 1,
    };

    this.setState({items: items,});
  }

  removeItem(itemToRemove) {
    const newItem = this.state.items;
    delete newItem[itemToRemove];

    this.setState({
      items: newItem,
    })
  };

  async selectPhone(phoneId) {
    const phone = await getById(phoneId);
    this.setState({selectedPhone: phone,});
  }

  unSelectPhone() {
    this.setState({
      selectedPhone: null,
    })
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section data-component="Filter"></section>
  
          <section data-component="ShoppingCart"></section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
          ${this.state.selectedPhone ? 
            `<div data-component="PhoneViewer"></div>`
            :
            `<div data-component="PhonesCatalog"></div>`
           }
        </div>
      </div>
    `;

    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: this.onPhoneSelected,
      onAdd: this.onAdd ,
    });
    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,

      onBack: this.onBack,
      onAdd: this.onAdd ,
    });
    this.initComponent(ShoppingCart, {
      items: this.state.items,
      onRemove: (itemToRemove) => this.removeItem(itemToRemove),
    });

    this.initComponent(Filter);
  }
}