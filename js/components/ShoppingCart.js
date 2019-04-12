export default class ShoppingCart {
  constructor(element) {
    this.element = element;

    this.render();
  }

  render() {
    this.element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        <li>Phone 1</li>
        <li>Phone 2</li>
        <li>Phone 3</li>
      </ul>
    `;
  }
}