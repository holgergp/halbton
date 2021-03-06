'use strict';

/* Services */
/**
 * Define the notes of the octave
 * @type {{name: string, index: number}}
 */
var notec = {"name": "C",
  targetName: 'C',
  index: 0
};
var notecsharp = {"name": 'C#',
  targetName: 'C#/D\u266D',
  index: 1
};
var noted = {"name": 'D',
  targetName: 'D',
  index: 2
};
var notedsharp = {"name": 'D#',
  targetName: 'D#/E\u266D',
  index: 3
};
var notee = {"name": 'E',
  targetName: 'E',
  index: 4
};
var notef = {"name": 'F',
  targetName: 'F',
  index: 5
};
var notefsharp = {"name": 'F#',
  targetName: 'F#/G\u266D',
  index: 6
};
var noteg = {"name": 'G',
  targetName: 'G',
  index: 7
};
var notegsharp = {"name": 'G#',
  targetName: 'G#/A\u266D',
  index: 8
};
var notea = {"name": 'A',
  targetName: 'A',
  index: 9
};
var noteasharp = {"name": 'A#',
  targetName: 'A#/H\u266D',
  index: 10
};
var noteh = {"name": 'H',
  targetName: 'H',
  index: 11
};

/**
 * 'Result' if no target tone could be computed
 * @type {{name: string}}
 */
var keinZielton = {"targetName": "Keine Ahnung!"};

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
  return _.isNull(object) || _.isUndefined(object);
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


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('halbtonApp.services').value('version', '0.1')


/**
 * Defining the halbtoene as constant
 */
  .constant('halbtoene', halbtoene)

/**
 * Registering the zieltonService as service to angular.js
 * In that way we can share logic between the two controllers
 */
  .factory('zieltonService', function () {

    return {
      /**
       * Given a basetone and a threshold compute a target tone
       * @param grundton basetone from which we want to compute
       * @param abstand threshold to 'add' to the basetone
       * @returns {{name: string}}
       */
      berechneZielton: function (grundton, abstand) {
        if (isNullOrEmpty(grundton) || isNullOrEmpty(abstand)) {
          return keinZielton;
        }
        var zieltonIndex = mod(halbtoene.length, grundton.index + abstand);

        var zielton = halbtoene[zieltonIndex];
        return isNullOrEmpty(zielton) ? keinZielton : zielton;
      },

      /**
       * Defining property of the service
       */
      keinZielton: keinZielton


    };


  });

