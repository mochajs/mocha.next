import Mocha from 'mocha-core';
import bdd from 'mocha-ui-bdd';

const mocha = Mocha({
  ui: bdd
});

mocha.run = mocha.run.bind(mocha);

export default mocha;
