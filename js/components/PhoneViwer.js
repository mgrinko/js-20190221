export default class PhoneViwer{
  constructor(element, props) {
    this.element = element;
    this.props = props;
    this.render();

    const buttons = this.element.querySelectorAll('[data-element="Button"]');

    this.element.addEventListener('click', (event) => {
      const elem = event.target.closest('[data-element="image"]');
      if (!elem) {
        return;
      }
      this.changeMainImage(elem.src);
    });

    this.buttonActions(buttons);

  }

  buttonActions(buttons) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.action === "Back") {
          this.props.onBack();
        } else if (button.dataset.action === "Add") {
          this.props.onPhoneAdded(button.dataset.elementId);
        }
      })
    });
  }


  changeMainImage(image) {
    const mainImage = this.element.querySelector('.phone');
    mainImage.src = image;
  }

  render() {
    const { phone } = this.props;

    this.element.innerHTML = `
      <div>
        <img class="phone" src="${ phone.images[0] }">

        <button data-element="Button" data-action="Back">Back</button>
        <button data-element="Button" data-action="Add" data-element-id="${phone.id}">Add to basket</button>


        <h1>${ phone.name }</h1>

        <p>${ phone.description }</p>

        <ul class="phone-thumbs">
          ${phone.images.map(image => `
          <li>
            <img src="${image}" data-element="image">
          </li>
          `).join('')}
        </ul>

        
      </div>
    `
  }
}