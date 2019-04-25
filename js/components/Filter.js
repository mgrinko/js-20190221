import Component from '../Component.js';

export default class Filter extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="Filter">
        <p>
          Search:
          <input data-element="Query">
        </p>
  
        <p>
          Sort by:
          <select data-element="SortField">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </div>
    `;
  }
}
