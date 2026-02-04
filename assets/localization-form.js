/** Shopify CDN: Minification failed

Line 17:4 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 18:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 32:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 37:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 46:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 48:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 53:18 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 62:19 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 63:8 Transforming const to the configured target environment ("es5") is not supported yet

**/
if (!customElements.get('localization-form')) {
  customElements.define(
    'localization-form',
    class LocalizationForm extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
          button: this.querySelector('button'),
          panel: this.querySelector('.disclosure__list-wrapper'),
        };
        this.elements.button.addEventListener('click', this.openSelector.bind(this));
        this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
        this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

        this.querySelectorAll('a').forEach((item) => item.addEventListener('click', this.onItemClick.bind(this)));
      }

      hidePanel() {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);
      }

      onContainerKeyUp(event) {
        if (event.code.toUpperCase() !== 'ESCAPE') return;

        if (this.elements.button.getAttribute('aria-expanded') == 'false') return;
        this.hidePanel();
        event.stopPropagation();
        this.elements.button.focus();
      }

      onItemClick(event) {
        event.preventDefault();
        const form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) form.submit();
      }

      openSelector() {
        this.elements.button.focus();
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute(
          'aria-expanded',
          (this.elements.button.getAttribute('aria-expanded') === 'false').toString()
        );
      }

      closeSelector(event) {
        const isChild =
          this.elements.panel.contains(event.relatedTarget) || this.elements.button.contains(event.relatedTarget);
        if (!event.relatedTarget || !isChild) {
          this.hidePanel();
        }
      }
    }
  );
}
