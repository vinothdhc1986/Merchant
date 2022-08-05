
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  useLocation,
  useHistory,
  useRouteMatch,
  generatePath,
} from 'react-router-dom';

function useRedirect() {
  const location: any = useLocation();
  const routeHistory = useHistory();
  const match: any = useRouteMatch();
  const { search } = location;
  const query = {};
  if (search) {
    search.substring(1).split('&').forEach((data) => {
      const [key, value] = data.split('=');
      query[key] = decodeURIComponent(value);
    });
  }
  return {
    params: match.params,
    url: match.url,
    push: routeHistory.push,
    location,
    replace: routeHistory.replace,
    path: match.path,
    generatePath,
    query,
  };
}

export default useRedirect;
