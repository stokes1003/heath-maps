import { MapProvider } from '../../../Providers/Map-Provider';
import { MapComponent } from './Maps';

const GoogleMaps = () => {
  return (
    <MapProvider>
      <MapComponent />
    </MapProvider>
  );
};
export default GoogleMaps;
