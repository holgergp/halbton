'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('halbtonApp.controllers'));
  var scope = null;
  var ctrl = null;

  var notec={"name": "C",
    index: 0
  }

  var notecsharp={"name": "C#",
    index: 1
  }


  var noteh={"name": "H",
    index: 11
  }

  var keineNote={"name": "Keine Ahnung!"

  }

  beforeEach(inject(function($rootScope, $controller) {
    //create a scope object for us to use.
    scope = $rootScope.$new();

    ctrl = $controller('HalbtonAbstandController', {
      $scope: scope
    });
  }));

  it('should set up the model', function() {

    //just assert. $scope was set up in beforeEach() (above)
    expect(scope.zielton).toEqual(keineNote);
    expect(scope.halbtoene.length).toBe(12);

  });

  it('should compute note c when providing c and offset 0', function() {
    scope.berechneZielton(notec,0);
    expect(scope.zielton).toEqual(notec);

  });

  it('should compute note c# when providing c and offset 13', function() {
    scope.berechneZielton(notec,13);
    expect(scope.zielton).toEqual(notecsharp);

  });

  it('should compute note h when providing c and offset -1', function() {
    scope.berechneZielton(notec,-1);
    expect(scope.zielton).toEqual(noteh);

  });

  it('should compute keine Ahnung when providing h and offset null', function() {
    scope.berechneZielton(noteh,null);
    expect(scope.zielton).toEqual(keineNote);

  });

  it('should compute keine Ahnung when providing null and offset 1', function() {
    scope.berechneZielton(null,1);
    expect(scope.zielton).toEqual(keineNote);

  });

  it('should compute keine Ahnung when providing null and offset null', function() {
    scope.berechneZielton(null,null)
    expect(scope.zielton).toEqual(keineNote);

  });



});
