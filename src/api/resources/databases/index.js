import Adapter from '../../adapters/codemotion';
import { crud } from '../../utils';

const adapter = Adapter;
const resourceName = 'databases';

const Database = {
  ...crud(adapter, resourceName)
};

export {
  Database,
  resourceName
};
