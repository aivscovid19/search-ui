import React from 'react';
import Loader from 'react-loader-spinner';
export default class Spinner extends React.Component {
    render() {
        const { mt, mb, color, height, width, type} = this.props;
        return (
         <div style={{display: "flex", justifyContent: "center", marginTop: mt, marginBottom: mb}}>
      <Loader
         type={type}
         color={color}
         height={height}
         width={width}
                />
                </div>
     );
    }
 }