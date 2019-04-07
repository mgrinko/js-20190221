export default class Filter {
  constructor(element) {
    this.element = element;
    
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <p>
        Search:
        <input>
      </p>

      <p>
        Sort by:
        <select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p> 
    `;
  }

}