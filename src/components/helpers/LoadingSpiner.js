import React from 'react';
import Loader from 'react-loader-spinner';
export default class Spinner extends React.Component {
    render() {
        const { mt, mb, color, height, width, type} = this.props;
        return (
         <div style={{display: "flex", justifyContent: "center", marginTop: mt, marginBottom: mb, alignItems: "center", flexDirection: "column"}}>
      <Loader
         type={type}
         color={color}
         height={height}
         width={width}
              />
                 <h3 style={{color: color}}>Loading...</h3>
                </div>
     );
    }
 }