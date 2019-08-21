export default class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = props;

    this.component = {};
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.render();
  }

  on(eventName, elementName, callback) {
    this.element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

      if (!delegateTarget) {
        return;
      }

      event.delegateTarget = delegateTarget;
      callback(event);
    })
  }

  initComponent(Constructor, props) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"]`);

    if (!element) {
      return;
    }

    const current = this.component[componentName]

    if (!current || !_.isEqual(current.props, props)) {
      this.component[componentName] = new Constructor(element, props);
    } else {
      element.parentNode.replaceChild(current.element, element)
    }
  }
}