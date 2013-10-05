'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {

  beforeEach(module('halbtonApp.controllers'));
  var scope = null;
  var gitarrenCtrl = null;
  var halbtonAbstandCtrl = null;


  var notec={"name": "C",
    index: 0
  };
  var notecsharp={"name": "C#",
    index: 1
  };
  var noted={"name": "D",
    index: 2
  };
  var notedsharp={"name": "D#",
    index: 3
  };
  var notee={"name": "E",
    index: 4
  };
  var notef={"name": "F",
    index: 5
  };
  var notefsharp={"name": "F#",
    index: 6
  };
  var noteg={"name": "G",
    index: 7
  };
  var notegsharp={"name": "G#",
    index: 8
  };
  var notea={"name": "A",
    index: 9
  };
  var noteasharp={"name": "A#",
    index: 10
  };
  var noteh={"name": "H",
    index: 11
  };


  var halbtoene = [
    notec,notecsharp,noted,notedsharp,notee,notef,notefsharp,noteg,notegsharp,notea,noteasharp,noteh
  ];


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
        halbtoene:halbtoene

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
        halbtoene:halbtoene
      });


      halbtonAbstandCtrl = $controller('HalbtonAbstandController', {
        $scope: scope,
        zieltonService:mockService,
        halbtoene:halbtoene
      });

    }));

    it('should set up the model', function () {

      //just assert. $scope was set up in beforeEach() (above)
      expect(scope.bundRange.length).toBe(12);
      expect(scope.saiten).not.toBeNull();
      expect(scope.saiten.length).toBe(6);
      expect(scope.saiten[0].buende.length).toBe(13);
      expect(scope.saiten[0].buende[0]).not.toBeNull();

    });

    it ('should call markiereZielton onChange',function() {
      //set up the spy.
      spyOn(scope, 'markiereZielton').andCallThrough();

      //make the call!
      scope.zielton=keineNote;
      scope.$apply();

      //assert!
      expect(scope.markiereZielton).toHaveBeenCalled();
    });

    it ('should mark Zielton E',function() {
      scope.markiereZielton(notee);
      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.zieltonMarkiert ===true;
      });

      expect(count.true).toBe(1);
      expect(count.false).toBe(12);
    });

    it ('should not mark Zielton Keine Note',function() {

      scope.markiereZielton({name: 'Keine Note'});


      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.zieltonMarkiert ===true;
      });

      expect(count.false).toBe(13);

    });

    it ('should not fail on null',function() {


      scope.markiereZielton(null);


      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.zieltonMarkiert ===true;
      });

      expect(count.false).toBe(13);
    });


    it ('should call markiereGrundton onChange',function() {
      //set up the spy.
      spyOn(scope, 'markiereGrundton').andCallThrough();

      //make the call!
      scope.grundton=keineNote;
      scope.$apply();

      //assert!
      expect(scope.markiereGrundton).toHaveBeenCalled();
    });

    it ('should mark Grundton E',function() {
      scope.markiereGrundton(notee);
      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.grundtonMarkiert ===true;
      });

      expect(count.true).toBe(1);
      expect(count.false).toBe(12);
    });

    it ('should not mark Grundton Keine Note',function() {
      scope.markiereZielton({name: 'Keine Note'});


      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.grundtonMarkiert ===true;
      });

      expect(count.false).toBe(13);

    });

    it ('should not fail on null',function() {
      scope.markiereGrundton(null);


      var count=_.countBy(scope.saiten[5].buende, function(bund) {
        return bund.grundtonMarkiert ===true;
      });

      expect(count.false).toBe(13);
    });

  });


});
