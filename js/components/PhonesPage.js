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
            order: 'Alphabetical',
            selectedPhone: null,
            items: {
                qweqwe: 2,
                dfsdfgdfg: 1,
            },
        };

        this.onPhoneSelected = (phoneId) => this.selectedPhone(phoneId);
        this.onAdd = (phoneId) => this.addItem(phoneId);
        this.onBack = () => this.unselectedPhone();
        this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);
        this.render();
        this.onFind = (text) => this.find(text);
        this.onSort = (order) => this.sortArr(order);
        this.loadPhones();
    }

    async loadPhones(query = this.state.query, order = this.state.order) {
        const phones = await getAll(query,order);
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

    find(query) {
        this.setState({ query });
        this.loadPhones();
    }

    selectedPhone(phoneId) {
        getById(phoneId)
            .then(phone => {
                this.setState({ selectedPhone: phone });
            });
    }

    unselectedPhone() {
        this.setState({ selectedPhone: null });
    }

    sortArr(order){
        this.setState({ order});
        this.loadPhones();
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
            onFind: this.onFind,
            onSort: this.onSort,
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
