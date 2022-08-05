import prod from './prod';
import stag from './stag';
import dev from './dev';
import qa from './qa';
import poc from './poc';

const config = {
  prod,
  stag,
  dev,
  qa,
  poc,
};

const BUILD_ENV = process.env.REACT_APP_BUILD_ENV;

export default config[BUILD_ENV || 'dev']
  ? config[BUILD_ENV || 'dev']
  : config['dev'];
