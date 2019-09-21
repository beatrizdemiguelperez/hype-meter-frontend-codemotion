import Adapter from '../../adapters/codemotion';
import { crud } from '../../utils';

const adapter = Adapter;
const resourceName = 'languages';

const Languages = {
  ...crud(adapter, resourceName)
};

export {
  Languages,
  resourceName
};
