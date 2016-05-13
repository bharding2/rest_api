// TODO: rest of e2e

describe('sloths', function() {
  it('should create a sloth', function() {
    browser.get('http://localhost:5525');
    element(by.model('slothsctrl.newSloth.name')).sendKeys('test sloth');
    element(by.id('createsloth')).click();
    element.all(by.css('#slothslist:first-child')).getText(function(text) {
      expect(text).toEqual('test sloth (gender: f) weighs 100 lbs and has a strength of 50');
    });
  });
});
