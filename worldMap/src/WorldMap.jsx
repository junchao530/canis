import { VectorMap } from '@react-jvectormap/core'
import { worldMill } from '@react-jvectormap/world'
import React, {useEffect,useState} from 'react'
import SearchBar from './button'
import { useCountries, colorScale} from './Countries'

function WorldMap() {
  const {countries,setCountries} = useCountries();
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1); //Force rerender of new countries 
  },[countries]);

  return (
    <div style={{ display: 'flex', paddingTop: '40px', margin: 'auto', width: '1800px', height: '600px' }}>
      <div style={{ flex: 1 }}>
        <VectorMap
          key={mapKey} //Set key to force rerender
          map={worldMill}
          containerStyle={{
            width: '100%',
            height: '600px',
          }}
          series={{
            regions: [
              {
                scale: colorScale,
                values: countries,
                min: 0,
                max: Math.max(...Object.values(countries)),
              },
            ],
          }}
          onRegionTipShow={function reginalTip(event, label, code) {
            return label.html(`
                      <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
                        <p>
                        <b>
                        ${label.html()}
                        </b>
                        </p>
                        <p>
                        ${code} 
                        ${countries[code]}
                        </p>
                        </div>`);
          }}
        />
      </div>
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <SearchBar setCountries={setCountries}/> {/* Pass setCountries as a prop to search bar*/}
      </div>
    </div>
  );
}

export default WorldMap;
