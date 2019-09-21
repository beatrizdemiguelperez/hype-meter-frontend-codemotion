import Adapter from '../../adapters/codemotion';
import { crud, buildUrl } from '../../utils';

const resourceName = 'profiles';

const getProfiles = adapter => ({
  ...crud(adapter, resourceName),

  getScores(id, search) {
    const url = buildUrl(adapter.getPath(`${resourceName}/${id}/scores`), search);
    const request = adapter.request(url, {
      method: 'GET'
    });
    return adapter.fetch(request);
  },
});
const Profiles = getProfiles(Adapter);

export {
  Profiles,
  resourceName
};
