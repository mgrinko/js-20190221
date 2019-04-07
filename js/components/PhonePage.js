import PhonesCatalog from './PhonesCatalog.js'
import PhoneViewer from './PhoneViewer.js'
import ShoppingCart from './ShoppingCart.js'
import Filter from './Filter.js' 
import {getAllPhones, getById} from '../api/Phones.js'

export default class PhonePage {
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
    };

    this.render();
  }

  initializeComponente(Constructor, props = {}) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"]`);
    
    if (element) {
      new Constructor(element, props);
    }
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section data-component="Filter">
          </section>

          <section data-component="ShoppingCart">
          </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
          ${ this.state.selectedPhone ? 
          `<div data-component="PhoneViewer"></div>` 
          : 
          `<div data-component="PhonesCatalog"></div>`
          }  
        </div>
      </div>
    `;

    this.initializeComponente(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: (phoneId) => {
        this.setState({
          selectedPhone: getById(phoneId),
        })
      }
    });
    this.initializeComponente(PhoneViewer, {
      phone: this.state.selectedPhone,
    });
    this.initializeComponente(ShoppingCart);
    this.initializeComponente(Filter);
  }
}