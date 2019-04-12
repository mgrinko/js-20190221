import Component from '../Component.js';

export default class ShoppingCart extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();
  }

  render() {
    this.element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${this.props.items.map(item => `
        <li>
          ${item}
          <button>X</button>
        </li>
        `).join('')}
      </ul>
    `;
  }
}