import Mocha from 'mocha-core';
import bdd from 'mocha-ui-bdd';
import runnerSerial from 'mocha-runner-serial';

export default Mocha({
  ui: bdd,
  runner: runnerSerial
});
