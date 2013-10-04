'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
  var mockHalbtoene=new Array(12);
  beforeEach(module('halbtonApp.controllers'));
  var scope = null;
  var gitarrenCtrl = null;
  var halbtonAbstandCtrl = null;

  var notec = {"name": "C",
    index: 0
  }

  var notecsharp = {"name": "C#",
    index: 1
  }


  var noteh = {"name": "H",
    index: 11
  }

  var keineNote = {"name": "Testcall"

  }

  var mockService = {
    berechneZielton: function (){
      return keineNote;
    },
    keinZielton: keineNote

  }


  describe('HalbtonAbstandController', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      //create a scope object for us to use.
      scope = $rootScope.$new();

      halbtonAbstandCtrl = $controller('HalbtonAbstandController', {
        $scope: scope,
        zieltonService: mockService,
        halbtoene:mockHalbtoene

      });
    }));

    it('should set up the model', function () {

      //just assert. $scope was set up in beforeEach() (above)
      expect(angular.isFunction(scope.berechneZielton)).toBe(true);
      //just assert. $scope was set up in beforeEach() (above)
      expect(scope.zielton).toEqual(keineNote);
      expect(scope.halbtoene.length).toBe(12);
    });

    it('should set call the zieltonservice', function () {
      //set up the spy.
      spyOn(mockService, 'berechneZielton').andCallThrough();

      //make the call!
      scope.berechneZielton(null,null)

      //assert!
      expect(mockService.berechneZielton).toHaveBeenCalled();

    });

    it('should set the zielton', function () {

      scope.berechneZielton(null,null)

      //assert!
      expect(scope.zielton).toEqual(keineNote);

    });


  });

  describe('GitarrenController', function () {

    beforeEach(inject(function ($rootScope, $controller) {
      //create a scope object for us to use.
      scope = $rootScope.$new();

      gitarrenCtrl = $controller('GitarrenController', {
        $scope: scope,
        zieltonService:mockService,
        halbtoene:mockHalbtoene
      });


      halbtonAbstandCtrl = $controller('HalbtonAbstandController', {
        $scope: scope,
        zieltonService:mockService,
        halbtoene:mockHalbtoene
      });

    }));

    it('should set up the model', function () {

      //just assert. $scope was set up in beforeEach() (above)
      expect(scope.normalSaiten.length).toEqual(6);
      expect(scope.bundRange.length).toBe(12);
      expect(scope.griffPositionen.length).toBe(6);
      expect(scope.griffPositionen[0]).not.toBeNull();
      expect(scope.griffPositionen[0].length).toBe(13);


    });

  });


});
