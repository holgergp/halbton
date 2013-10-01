'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('HalbtonApp', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/default");
  });


  describe('Halbtonberechnung', function() {

    beforeEach(function() {
      browser().navigateTo('#/view1');
    });

    it('should render view1 when user navigates to /view1', function() {
      expect(element('[ng-view] div:first').text()).
        toMatch(/Wenn ich von/);
    });

    it('should render "Keine Ahnung" as a result when user navigates to /view1', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/Keine/);
    });

    it('should render D# as a result when user navigates to /view1 and inputs basetone C and threshold 3', function() {
      select('grundton').option('C');
      input('abstand').enter('3');
      expect(element('[ng-view] p:first').text()).
        toMatch(/D#/);
    });

    it('should render "Keine Ahnung" as a result when user navigates to /view1 and enters invalid input', function() {
      select('grundton').option('C');
      input('abstand').enter('');
      expect(element('[ng-view] p:first').text()).
        toMatch(/Keine/);
    });

  });



});
