/** Shopify CDN: Minification failed

Line 15:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 16:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 22:21 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 23:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 31:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 38:9 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 39:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 43:14 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 44:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 50:12 Transforming object literal extensions to the configured target environment ("es5") is not supported yet

**/
class MainSearch extends SearchForm {
  constructor() {
    super();
    this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    let allSearchForms = [];
    this.allSearchInputs.forEach((input) => allSearchForms.push(input.form));
    this.input.addEventListener('focus', this.onInputFocus.bind(this));
    if (allSearchForms.length < 2) return;
    allSearchForms.forEach((form) => form.addEventListener('reset', this.onFormReset.bind(this)));
    this.allSearchInputs.forEach((input) => input.addEventListener('input', this.onInput.bind(this)));
  }

  onFormReset(event) {
    super.onFormReset(event);
    if (super.shouldResetForm()) {
      this.keepInSync('', this.input);
    }
  }

  onInput(event) {
    const target = event.target;
    this.keepInSync(target.value, target);
  }

  onInputFocus() {
    const isSmallScreen = window.innerWidth < 750;
    if (isSmallScreen) {
      this.scrollIntoView({ behavior: 'smooth' });
    }
  }

  keepInSync(value, target) {
    this.allSearchInputs.forEach((input) => {
      if (input !== target) {
        input.value = value;
      }
    });
  }
}

customElements.define('main-search', MainSearch);
