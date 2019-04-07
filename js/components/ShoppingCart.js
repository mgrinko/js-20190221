export default class ShoppingCart {
  constructor(element, props) {
    this.element = element;
    this.props = props
    this.render();

    this.element.addEventListener('click', (event) => {
     const item = event.target.closest('[data-element="basketItem"]');
     this.props.onDelete(item.dataset.elementNumber);
     item.remove();
    })
    
  }

  render() {
    const { basketItems } = this.props;
    this.element.innerHTML = `
      <div class="ShoppingCart">
        <h4>Shopping Cart</h4>
        <ul>
          ${basketItems.map((item, index)=> `
            <li data-element="basketItem" data-element-number="${index}">
            ${item}
            <span class="glyphicon glyphicon-remove"></span>
            </li>
          `).join('')}      
        </ul>
      </div>
    `;
  }

};
