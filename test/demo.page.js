
class Page {
  load() {
    browser.get('/');
  }

  get toolboxButton() { return new Button(); }
  get datePicker() { return new DatePicker(); }
  get gridLayout() { return new GridLayout(); }
}

class Button {
  constructor() {
    this.element = $('react-button');
    this.icon = this.element.$('a svg');
    this.text = this.element.getText();
  }
}

class DatePicker {
  constructor() {
    this.element = $('react-date-picker');
    this.value = this.element.$('input').getAttribute('value');
    this.savedDate = $('.saved-date').getText();
  }

  open() { return this.element.$('input').click(); };
  selectDay(day) { return $('.ant-picker-cell-in-view[title$="' + day + '"]').click(); }
}

class GridLayout {
  constructor() {
    this.element = $('react-row > div');
    this.items = $$(this.element.locator().value + ' > div');
  }

  getItemContent(index) { return this.items.get(index); }

  add() { return $('.add-grid-item').click(); }
}

module.exports = new Page();
