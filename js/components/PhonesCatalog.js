import Component from '../Component.js';

export default class PhonesCatalog extends Component{
  constructor(element, props) {
    super(element, props)
    this.render();

    this.on('click', 'phoneLink', (event) => {
      const phoneId = event.delegateTarget.dataset.phoneId;
      this.props.onPhoneSelected(phoneId);
    });

    this.on('click', 'AddButton', (event) => {
      const phoneId = event.delegateTarget.dataset.phoneId;
      this.props.onAdd(phoneId);
    });
  }

  render() {
    this.element.innerHTML = `
    <div>
      <ul class="phones">
        ${this.props.phones.map(phone => `

          <li class="thumbnail">
            <a data-phone-id="${phone.id}" 
            data-element="phoneLink" href="#!/phones/${phone.id}" class="thumb">
              <img alt="Motorola XOOM™ with Wi-Fi" src="${phone.imageUrl}">
            </a>
      
            <div class="phones__btn-buy-wrapper">
              <a data-phone-id="${phone.id}" data-element="AddButton"
                class="btn btn-success">
                Add
              </a>
            </div>
      
            <a data-phone-id="${phone.id}"
             data-element="phoneLink" href="#!/phones/${phone.id}">${phone.name}</a>
            <p>${phone.snippet}</p>
          </li>
          
        `).join('')}
      </ul>
    </div>    
    `;
  }
}