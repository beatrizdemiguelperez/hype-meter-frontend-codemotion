import Adapter from '../../adapters/codemotion';
import { crud } from '../../utils';

const adapter = Adapter;
const resourceName = 'frameworks';

const Frameworks = {
  ...crud(adapter, resourceName)
};

export {
  Frameworks,
  resourceName
};
