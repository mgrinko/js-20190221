export default class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = props;

    this.components = {};
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
      
      callback(event)
    });
  }

  initializeComponent(Constructor, props) {
    const constructorName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${constructorName}"]`);

    if (!element) {
      return;
    }

    const currentComponent = this.components[constructorName];
    
    if (!currentComponent || !_.isEqual(currentComponent.props, props)) {
      
      this.components[constructorName] = new Constructor(element, props);
    } else {
      element.parentNode.replaceChild(currentComponent.element, element)
    }
  }
}