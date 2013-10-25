'use strict';

/* jasmine specs for services go here */

describe('service', function () {
  beforeEach(module('halbtonApp.services'));


  describe('version', function () {
    it('should return current version', inject(function (version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('zieltonService', function () {

    var myZieltonService;

    var keineNote = {"targetName": "Keine Ahnung!"

    };

    var notec = {"name": "C",
      targetName: 'C',
      index: 0
    };

    var noteh = {"name": "H",
      targetName: 'H',
      index: 11
    };

    var notecsharp = {"name": "C#",
      targetName: "C#/D\u266D",
      index: 1
    };
    //excuted before each "it" is run.
    beforeEach(function () {

      //inject your service for testing.
      inject(function (zieltonService) {
        myZieltonService = zieltonService;
      });
    });

    it('should setup the model', function () {
      expect(angular.isFunction(myZieltonService.berechneZielton)).toBe(true);
    });


    it('should compute note c when providing c and offset 0', function () {
      expect(myZieltonService.berechneZielton(notec, 0)).toEqual(notec);
    });

    it('should compute note c# when providing c and offset 13', function () {
      expect(myZieltonService.berechneZielton(notec, 13)).toEqual(notecsharp);
    });

    it('should compute note h when providing c and offset -1', function () {
      expect(myZieltonService.berechneZielton(notec, -1)).toEqual(noteh);
    });

    it('should compute keine Ahnung when providing h and offset null', function () {
      expect(myZieltonService.berechneZielton(noteh, null)).toEqual(keineNote);

    });

    it('should compute keine Ahnung when providing null and offset 1', function () {
      expect(myZieltonService.berechneZielton(null, 1)).toEqual(keineNote);

    });

    it('should compute keine Ahnung when providing null and offset null', function () {
      expect(myZieltonService.berechneZielton(null, null)).toEqual(keineNote);

    });
  });

  describe('halbtoene', function () {
    it('should return the halbtoene', inject(function (halbtoene) {
      expect(halbtoene.length).toEqual(12);
    }));
  });


});
