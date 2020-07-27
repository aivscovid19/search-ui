import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export default class SearchScore extends React.Component{
    render() {
        const { placement, rating } = this.props;
        return (
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item>
                    {parseInt(rating) > 0 ? <KeyboardArrowUpIcon/>
                        : <KeyboardArrowDownIcon/>}
                </Grid>
                <Grid item >
                    <Typography component="p" gutterBottom variant="subtitle2">
                        {rating}
                    </Typography>
                </Grid>
                <Grid item >
              <Typography  component="p"  gutterBottom variant="subtitle2">
                        Score:
                    </Typography>
                    </Grid>
                    <Grid item >
                    <Typography component="p" gutterBottom>
                        {placement}
                    </Typography>
                </Grid>
              </Grid>
        );
    }
}