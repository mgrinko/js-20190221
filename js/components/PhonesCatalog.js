export default class PhonesCatalog {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    this.render();

    this.element.addEventListener('click', (event) => {
      const link = event.target.closest('[data-element="PhoneLink"]');

      if(!link) {
        return;
      }

      const phoneId = link.dataset.phoneId;
      this.props.onPhoneSelected(phoneId);
    });

    const Buttons = this.element.querySelectorAll('[data-action="Add"]');
    this.buttonActions(Buttons);
  }

  buttonActions(Buttons) {
    Buttons.forEach(button => {
      button.addEventListener('click', () => {
        const phoneId = button.dataset.phoneId;
        this.props.onPhoneAdded(phoneId);
      });
    });
  }

  render() {
    this.element.innerHTML = `
      <div>
        <ul>
        <ul class="phones">
          ${this.props.phones.map(phone => `
            <li class="thumbnail">
              <a
              data-element="PhoneLink" 
              data-phone-id="${ phone.id }"
              href="#!/phones/${ phone.id }" class="thumb">
                <img alt="${ phone.name }" src="${ phone.imageUrl }">
              </a>
              <a
              data-element="PhoneLink" 
              data-phone-id="${ phone.id }"
              href="#!/phones/${ phone.id }">${ phone.name }</a>
              <button class="btn btn-primary" data-action="Add" data-phone-id="${ phone.id }">Add</button>
              <p>${ phone.snippet }</p>
              
            </li>
          `).join('')}
        </ul>

      </div>
    `
  }
}