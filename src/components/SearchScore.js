import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export default class SearchScore extends React.Component{
    render() {
        const { score, placement } = this.props;
        return (
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item>
                    {placement > 0
                        ? <KeyboardArrowUpIcon htmlColor="#99ff99" />
                        : <KeyboardArrowDownIcon color="error" />}
                </Grid>
                <Grid item >
                    <Typography component="p" gutterBottom variant="subtitle2">
                        {placement > 0 ? '+' : ''}{placement}
                    </Typography>
                </Grid>
                <Grid item >
              <Typography  component="p"  gutterBottom variant="subtitle2">
                        Score:
                    </Typography>
                    </Grid>
                    <Grid item >
                    <Typography component="p" gutterBottom>
                        {score}
                    </Typography>
                </Grid>
              </Grid>
        );
    }
}