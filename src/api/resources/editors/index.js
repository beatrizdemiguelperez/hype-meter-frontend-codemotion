import Adapter from '../../adapters/codemotion';
import { crud } from '../../utils';

const adapter = Adapter;
const resourceName = 'editors';

const Editors = {
  ...crud(adapter, resourceName)
};

export {
  Editors,
  resourceName
};
