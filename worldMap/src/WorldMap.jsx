import { VectorMap } from '@react-jvectormap/core'
import { worldMill } from '@react-jvectormap/world'
import React from 'react'
import { colorScale, countries } from './Countries'

function WorldMap() {
  return (
    <div style={{ paddingTop:"40px",margin: "auto", width: "700px", height: "600px"}}>
          <VectorMap map={worldMill}
    containerStyle={{
      width: '700px',
      height: '600px'
    }}
    //backgroundColor="#282C3"
    series={{
      regions:[
        {
          scale: colorScale,
          values: countries,
          min:0,
          max:100
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


  )
}

export default WorldMap