import Component from '../Component.js';

export default class ShoppingCart extends Component{
  constructor(element, props) {
    super(element, props)

    this.render();

    this.on('click', 'RemoveButton', (event) => {
      const item = event.delegateTarget.dataset.item;
      this.props.onRemove(item);
    });
  }

  render() {
    this.element.innerHTML = `
      <h4>Shopping Cart</h4>
      <ul class="phone-list">
        ${Object.keys(this.props.items).map(item => `
          <li class="phone-item">
            ${item} - ${this.props.items[item]}
            <button data-element="RemoveButton" data-item="${item}" class="btn btn-success">X</button>
          </li>
        `).join('')}
      </ul>    
    `;
  }
}