let page = require("./demo.page");

describe("React Toolbox Button", () => {

  beforeEach(() => {
    page.load();
  });

  it("should display transcluded text", () => {
    expect(page.toolboxButton.getText()).toEqual("CODE");
  });

  it("should contain icon svg", () => {
    expect(page.toolboxButtonIcon.isDisplayed()).toBeTruthy();
  });
});