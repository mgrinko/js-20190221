import Component from '../Component.js';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import ShoppingCart from './ShoppingCart.js';
import Filter from './Filter.js';
import { getAll, getById } from '../api/phones.js';

export default class PhonesPage extends Component {
  constructor(element, props) {
    super(element, props);

    this.state = {
      phones: [],
      query: '',
      order: 'name',
      selectedPhone: null,
      items: {
        qweqwe: 2,
        dfsdfgdfg: 1,
      },
    };

    this.onPhoneSelected = (phoneId) => this.selectedPhone(phoneId);
    this.onAdd = (phoneId) => this.addItem(phoneId);
    this.onBack = () => this.setState({ selectedPhone: null });
    this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);

    this.onQueryChange = (query) => {
      this.setState({ query });
      this.loadPhones();
    };

    this.onOrderChange = (order) => {
      this.setState({ order });
      this.loadPhones();
    };

    this.render();

    this.loadPhones();
  }

  async loadPhones() {
    const phones = await getAll({
      query: this.state.query,
      order: this.state.order,
    });

    this.setState({ phones });
  }

  addItem(item) {
    const oldItems = this.state.items;
    const items = {
      ...oldItems,
      [item]: oldItems[item] ? oldItems[item] + 1 : 1,
    };

    this.setState({ items });
  }

  removeItem(itemToRemove) {
    const newItems = { ...this.state.items };
    delete newItems[itemToRemove];

    this.setState({
      items: newItems,
    });
  }

  selectedPhone(phoneId) {
    getById(phoneId)
      .then(phone => {
        this.setState({ selectedPhone: phone });
      });
  }

  init() {
    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: this.onPhoneSelected,
      onAdd: this.onAdd,
    });

    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      onBack: this.onBack,
      onAdd: this.onAdd,
    });

    this.initComponent(ShoppingCart, {
      items: this.state.items,
      onRemove: this.onRemove,
    });

    this.initComponent(Filter, {
      onQueryChange: this.onQueryChange,
      onOrderChange: this.onOrderChange,
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="Filter"></div>
          </section>
  
          <section>
            <div data-component="ShoppingCart"></div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
          ${this.state.selectedPhone ? `
            <div data-component="PhoneViewer"></div>
          ` : `
            <div data-component="PhonesCatalog"></div>
          `}
        </div>
      </div>
    `;

    this.init();
  }
}
