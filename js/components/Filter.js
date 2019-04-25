import Component from "../Component";

export default class Filter extends Component {
    constructor(element, props) {
        super(element, props);

        this.render();

        this.on('input', 'Filter',this.debounce((event) => {
            this.props.onFind(event.target.value);
        }).bind(this));

        this.on('click', 'Sort',(event) => {
            this.props.onSort(event.target.value);
        });
    }

    debounce(func, time =  1000) {
        let timerId;
        return function(...args){
            clearTimeout(timerId);
            timerId = setTimeout(()=>{
                func.call(this,...args)
            },time);
        }
    }



    render() {
        this.element.innerHTML = `
      <div class="Filter">
        <p>
          Search:
          <input data-element="Filter">
        </p>
  
        <p>
          Sort by:
          <select  data-element="Sort">
            <option value="Alphabetical">Alphabetical</option>
            <option value="Newest">Newest</option>
          </select>
        </p>
      </div>
    `;
    }
}
