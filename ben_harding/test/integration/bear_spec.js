describe('bears', function() {
  it('should create a bear', function() {
    browser.get('http://localhost:5525');
    element(by.model('bearsctrl.newBear.name')).sendKeys('test bear');
    element(by.id('createbear')).click();
    element.all(by.css('#bearslist:first-child')).getText(function(text) {
      expect(text).toEqual('test bear (gender: m) weighs 500 lbs and has a strength of 10');
    });
  });
});
