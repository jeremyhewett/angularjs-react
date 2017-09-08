
class Page {
  load() {
    browser.get('/');
  }

  get toolboxButton() { return new ToolboxButton(); }
  get datePicker() { return new DatePicker(); }
  get gridLayout() { return new GridLayout(); }
}

class ToolboxButton {
  constructor() {
    this.element = $('react-toolbox-button');
    this.icon = this.element.$('a > svg');
    this.text = this.element.getText();
  }
}

class DatePicker {
  constructor() {
    this.element = $('react-toolbox-date-picker');
    this.value = this.element.$('input').getAttribute('value');
    this.savedDate = $('.saved-date').getText();
  }

  open() { return this.element.$('input').click(); };
  selectDay(day) { return element(by.cssContainingText('[data-react-toolbox="day"]', day)).click(); }
}

class GridLayout {
  constructor() {
    this.element = $('.react-grid-layout');
    this.items = $$(this.element.locator().value + ' > .react-grid-item');
  }

  getItemContent(index) { return $$(this.items.locator().value + ' > div').get(index); }

  add() { return $('.add-grid-item').click(); }
}

module.exports = new Page();
