import Component from '../Component.js';

export default class ShoppingCart extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();

    this.on('click', 'RemoveButton', (event) => {
      const item = event.delegateTarget.dataset.item;
      this.props.onRemove(item);
    })
  }

  render() { 

    this.element.innerHTML = `
      <h3>Shopping Cart</h3>
      <ul class="items-list">
        ${Object.keys(this.props.items).map(item => `
        <li class="item">
          ${item.toLocaleUpperCase().slice(0, 20)} - ${this.props.items[item]}
          <button data-element="RemoveButton" data-item="${item}">X</button>
        </li>
        `).join('')}
      </ul>
    `;
  }
}