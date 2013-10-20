'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var serviceModule = angular.module('halbtonApp.services', []);

serviceModule.value('version', '0.1');

/**
 * Define the notes of the octave
 * @type {{name: string, index: number}}
 */
var notec = {"name": "C",
  index: 0
};
var notecsharp = {"name": "C#/C\u266D",
  index: 1
};
var noted = {"name": "D",
  index: 2
};
var notedsharp = {"name": "D#/D\u266D",
  index: 3
};
var notee = {"name": "E",
  index: 4
};
var notef = {"name": "F",
  index: 5
};
var notefsharp = {"name": "F#/F\u266D",
  index: 6
};
var noteg = {"name": "G",
  index: 7
};
var notegsharp = {"name": "G#/G\u266D",
  index: 8
};
var notea = {"name": "A",
  index: 9
};
var noteasharp = {"name": "A#/A\u266D",
  index: 10
};
var noteh = {"name": "H",
  index: 11
};

/**
 * 'Result' if no target tone could be computed
 * @type {{name: string}}
 */
var keinZielton = {"name": "Keine Ahnung!"};

/**
 * All halbtoene
 * @type {Array}
 */
var halbtoene = [
  notec, notecsharp, noted, notedsharp, notee, notef, notefsharp, noteg, notegsharp, notea, noteasharp, noteh
];


/**
 * Überprüft (mithilfe von Underscore) on
 * @param object
 * Null oder undefined ist
 * @returns {Boolean}
 * true falls null oder undefined
 * false falls nicht
 */
var isNullOrEmpty = function (object) {
  return _.isNull(object) ||_.isUndefined(object);
};

/**
 * Helferfunktion die die Modulofunktion in Javascript geraderückt
 * siehe auch http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
 * @param n
 * @param m
 * @returns {number}
 * Beispiel n:12 m:-1 returns 11
 */
var mod = function (n, m) {
  return ((m % n) + n) % n;
};

/**
 * Defining the halbtoene as constant
 */
serviceModule.constant('halbtoene', halbtoene);

/**
 * Registering the zieltonService as service to angular.js
 * In that way we can share logic between the two controllers
 */
serviceModule.factory('zieltonService', function () {

  return {
    /**
     * Given a basetone and a threshold compute a target tone
     * @param grundton basetone from which we want to compute
     * @param abstand threshold to 'add' to the basetone
     * @returns {{name: string}}
     */
    berechneZielton : function (grundton, abstand) {
      if (isNullOrEmpty(grundton) || isNullOrEmpty(abstand)) {
        return keinZielton;
      }
      var zieltonIndex = mod(halbtoene.length, grundton.index + abstand);

      var zielton = halbtoene[zieltonIndex];
      return isNullOrEmpty(zielton) ? keinZielton:zielton;
    },

    /**
     * Defining property of the service
     */
    keinZielton : keinZielton


  };



});

