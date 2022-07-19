let page = require('./demo.page');

describe('React Toolbox Button', () => {

  beforeEach(() => {
    page.load();
  });

  it('should display transcluded text', () => {
    expect(page.toolboxButton.text).toEqual('Code');
  });

  it('should contain icon svg', () => {
    expect(page.toolboxButton.icon.isDisplayed()).toBeTruthy();
  });
});

describe('React Date Picker', () => {

  beforeEach(() => {
    page.load();
  });

  it('should display pre-set date', () => {
    expect(page.datePicker.value).toEqual('2000-01-01');
    expect(page.datePicker.savedDate).toEqual('Jan 1, 2000');
  });

  it('should update date when new date selected', () => {
    page.datePicker.open();
    page.datePicker.selectDay(2);
    expect(page.datePicker.value).toEqual('2000-01-02');
    expect(page.datePicker.savedDate).toEqual('Jan 2, 2000');
  });

});

describe('React Grid Layout', () => {

  beforeEach(() => {
    page.load();
  });

  it('should display the pre-set grid', () => {
    let backgroundImage = page.gridLayout.getItemContent(0).getCssValue('background-image');
    expect(backgroundImage).toEqual('url("https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg")');

    backgroundImage = page.gridLayout.getItemContent(1).getCssValue('background-image');
    expect(backgroundImage).toEqual('url("https://angular.io/assets/images/logos/angular/angular.svg")');

    backgroundImage = page.gridLayout.getItemContent(2).getCssValue('background-image');
    expect(backgroundImage).toEqual('url("https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Ember.js_Logo_and_Mascot.png/170px-Ember.js_Logo_and_Mascot.png")');
  });

  it('should add a new grid item', () => {
    page.gridLayout.add();
    let backgroundImage = page.gridLayout.getItemContent(3).getCssValue('background-image');
    expect(backgroundImage).toEqual('url("https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg")');
  });

});
