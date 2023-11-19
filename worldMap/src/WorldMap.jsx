import { VectorMap } from '@react-jvectormap/core'
import { worldMill } from '@react-jvectormap/world'
import React from 'react'
import { colorScale, countries } from './Countries'
import CompanyButtonList from './button'

function WorldMap() {
  return (
    <div style={{ display: 'flex', paddingTop: '40px', margin: 'auto', width: '1200px', height: '600px' }}>
      <div style={{ flex: 1 }}>
        <VectorMap
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
                max: 100,
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
        <CompanyButtonList />
      </div>
    </div>
  );
}

export default WorldMap;
