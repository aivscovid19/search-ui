import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default class ServerError extends React.Component{
    render() {
        const { width, height, color, mt, mb, message } = this.props
        return (
            <div style={{ display: "flex", marginTop: mt, marginBottom: mb, flexDirection: "column", alignItems: "center", color: color }}>
                <ErrorOutlineIcon style={{ width: width, height: height}} />
                <h1>Ops, something went wrong...</h1>
                <h4>{message}</h4>
            </div>
        )
    }
}