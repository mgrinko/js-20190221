export default class ShoppingCart {
  constructor(element, props) {
    this.element = element;
    this.props = props
    this.render();
    
  }

  render() {
    const { basketItems } = this.props;
    this.element.innerHTML = `
      <div class="ShoppingCart">
        <h4>Shopping Cart</h4>
        <ul>
          ${basketItems.map(item => `
            <li>
            ${item}
            <span class="glyphicon glyphicon-remove"></span>
            </li>
          `).join('')}      
        </ul>
      </div>
    `;
  }

};
