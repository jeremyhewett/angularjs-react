
class Page {
  load() {
    browser.get('/');
  }

  get toolboxButton() { return $("react-toolbox-button"); }
  get toolboxButtonIcon() { return this.toolboxButton.$("a > svg"); } //svg needs to be direct child on anchor
}

module.exports = new Page();
