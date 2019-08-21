import Component from '../Component.js';

export default class PhoneViewer extends Component {
  constructor(element, props) {
    super(element, props);

    this.state = {
      selectedImgage: this.props.phone.images[0],
    }

    this.render();

    this.on('click', 'backButton', () => {
      this.props.onBack();
    });

    this.on('click', 'AddButton', () => {
      this.props.onAdd(this.props.phone.id);
    });

    this.on('click', 'SmallImage', (event) => {
      const imageUrl = event.delegateTarget.dataset.imageUrl;
      this.setState({
        selectedImgage: imageUrl,
      })
    });
  }

  render() {
    const {phone} = this.props;
    this.element.innerHTML = `
      <div>

        <img class="phone" src="${this.state.selectedImgage}">

        <button data-element="backButton">Back</button>
        <button data-element="AddButton">Add to basket</button>


        <h1>${phone.name}</h1>

        <p>${phone.description}</p>

        <ul class="phone-thumbs">
          ${phone.images.map(imageUrl => `
          <li data-element="SmallImage" data-image-url="${imageUrl}">
            <img src="${imageUrl}">
          </li>
          `).join('')}
        </ul>

        <ul class="specs">
          <li>
            <span>Availability and Networks</span>
            <dl>
              <dt>Availability</dt>
              <dd></dd>
            </dl>
          </li>
          <li>
            <span>Battery</span>
            <dl>
              <dt>Type</dt>
              <dd>${phone.battery.type}</dd>
              <dt>Talk Time</dt>
              <dd>${phone.battery.talkTime}</dd>
              <dt>Standby time (max)</dt>
              <dd>${phone.battery.standbyTime}</dd>
            </dl>
          </li>
          <li>
            <span>Storage and Memory</span>
            <dl>
              <dt>RAM</dt>
              <dd>${phone.storage.ram}</dd>
              <dt>Internal Storage</dt>
              <dd>${phone.storage.flash}</dd>
            </dl>
          </li>
          <li>
            <span>Connectivity</span>
            <dl>
              <dt>Network Support</dt>
              <dd></dd>
              <dt>WiFi</dt>
              <dd>${phone.connectivity.wifi}</dd>
              <dt>Bluetooth</dt>
              <dd>${phone.connectivity.bluetooth}</dd>
              <dt>Infrared</dt>
              <dd>${phone.connectivity.infrared ? `✓` : `✘`}</dd>
              <dt>GPS</dt>
              <dd>${phone.connectivity.gps ? `✓` : `✘`}</dd>
            </dl>
          </li>
          <li>
            <span>Android</span>
            <dl>
              <dt>OS Version</dt>
              <dd>${phone.android.os}</dd>
              <dt>UI</dt>
              <dd>${phone.android.ui}</dd>
            </dl>
          </li>
          <li>
            <span>Size and Weight</span>
            <dl>
              <dt>Dimensions</dt>
              <dd>${phone.sizeAndWeight.dimensions[0]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[1]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[2]}</dd>
              <dt>Weight</dt>
              <dd>${phone.sizeAndWeight.weight}</dd>
            </dl>
          </li>
          <li>
            <span>Display</span>
            <dl>
              <dt>Screen size</dt>
              <dd>${phone.display.screenSize}</dd>
              <dt>Screen resolution</dt>
              <dd>${phone.display.screenResolution}</dd>
              <dt>Touch screen</dt>
              <dd>${phone.display.touchScreen ? `✓` : `✘`}</dd>
            </dl>
          </li>
          <li>
            <span>Hardware</span>
            <dl>
              <dt>CPU</dt>
              <dd>${phone.hardware.cpu}</dd>
              <dt>USB</dt>
              <dd>${phone.hardware.usb}</dd>
              <dt>Audio / headphone jack</dt>
              <dd>${phone.hardware.audioJack}</dd>
              <dt>FM Radio</dt>
              <dd>${phone.hardware.fmRadio ? `✓` : `✘`}</dd>
              <dt>Accelerometer</dt>
              <dd>${phone.hardware.accelerometer ? `✓` : `✘`}</dd>
            </dl>
          </li>
          <li>
            <span>Camera</span>
            <dl>
              <dt>Primary</dt>
              <dd>${phone.camera.primary}</dd>
              <dt>Features</dt>
              <dd>${phone.camera.features[0]}, ${phone.camera.features[1]}</dd>
            </dl>
          </li>
          <li>
            <span>Additional Features</span>
            <dd>${phone.additionalFeatures}</dd>
          </li>
        </ul>
      </div>
    `;
  }
}