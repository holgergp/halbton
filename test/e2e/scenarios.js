'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('HalbtonApp', function () {

  beforeEach(function () {
    //Navigiere zum Root der Anwendung
    browser().navigateTo('../..//');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function () {

    expect(browser().location().url()).toBe("/default");
  });


  describe('Halbtonberechnung', function () {

    beforeEach(function () {
      browser().navigateTo('#/view1');
    });

    it('should render view1 when user navigates to /view1', function () {
      expect(element('[ng-view] div:first').text()).toMatch(/Wenn ich von/);
    });

    it('should render "Keine Ahnung" as a result when user navigates to /view1', function () {
      expect(element('[ng-view] div.halbtonAnswer').text()).toMatch(/Keine/);
    });

    it('should render E as a result when user navigates to /view1 and inputs basetone C and threshold 4', function () {
      select('grundton').option('C');
      input('abstand').enter('4');
      expect(element('[ng-view] div.halbtonAnswer').text()).toMatch(/E/);
    });

    it('should render "Keine Ahnung" as a result when user navigates to /view1 and enters invalid input', function () {
      select('grundton').option('C');
      input('abstand').enter('');
      expect(element('[ng-view] div.halbtonAnswer').text()).toMatch(/Keine/);
    });

  });

  describe('Gitarre', function () {

    beforeEach(function () {
      browser().navigateTo('#/view1');
    });

    it('should show a guitar when user navigates to /view1', function () {
      expect(repeater('div.gitarrenHals').count()).toEqual(1);
      expect(repeater('div.gitarrenHals > div').count()).toEqual(6);
    });

    it('should mark note e on the guitar when user selects an e as grundton', function () {
      select('grundton').option("E");
      //Acht es gibt es, das reicht erstmal
      expect(repeater('div.grundtonMarkiert').count()).toEqual(8);
    });


    it('should mark note e as grundton and f as zielton on the guitar when user selects an e as grundton and abstand 1', function () {
      select('grundton').option("E");
      input('abstand').enter('1');

      //Acht es gibt es, das reicht erstmal
      expect(repeater('div.grundtonMarkiert').count()).toEqual(8);
      //Sechs fs gibt es, das reicht erstmal
      expect(repeater('div.zieltonMarkiert').count()).toEqual(6);

    });

    it('should mark note e as grundton and zielton on the guitar when user selects an e as grundton and abstand 0', function () {
      select('grundton').option("E");
      input('abstand').enter('0');
      //Acht es gibt es, das reicht erstmal
      expect(repeater('div.grundtonMarkiert').count()).toEqual(8);
      //Acht fs gibt es, das reicht erstmal
      expect(repeater('div.zieltonMarkiert').count()).toEqual(8);
    });


  });


});
