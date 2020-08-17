import React, {useState} from 'react'
import DeepSearchForm from './submitForm/DeepSearchForm';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, TextField } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const DeepSearch = () =>{
    const params = useParams();
    const [search, setSearch] = useState(params.search);
    return (
        <div>
            <Box p={3} height="100vh">
        <Box my={2}>
          <Typography component="h1" onClick={() => {window.location = '/'}} variant="h4">
            BREATHE
          </Typography>
        </Box>
        <TextField placeholder="search" variant="outlined" size="small" style={{ width: "100%" }} onChange={(e) => setSearch(e.target.value)} value={search} />
                <Container style={{display: "flex"}}>
                        <Container>
                            <Container style={{padding: '0px', margin: "30px 0px", justifyContent:"flex-start"}}>
                                <Typography fontWeight="fontWeightBold" variant="h5" component="h2">Thanks for using deep literature search.</Typography>
                                <Typography fontWeight="fontWeightBold" component="h2" variant="h5">Please submit form bellow, to recive results.</Typography>
                            </Container>
                            <DeepSearchForm style={{margin: "0px", padding: "0px"}}/>
                        </Container>
                    <Container>
                        <Container style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                            <ArrowBackIosIcon style={{color: "grey"}}/>
                            <a style={{textDecoration: "none", color: "grey", marginTop: "1.5px"}} href={'/search-ui/#/' + params.search}>Switch to Quick Search</a>
                        </Container>
                        <Container style={{ justifyContent: "center", marginTop: "40px" }}>
                        <h4>More detailed explanation of how search works and its value</h4>
                        <h5>Please, note, that Deep Literature Search functionality is disabled temporarily. The form can be submitted but no results will be send to the email.</h5>
                            <Typography>
                            sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium
                            </Typography>
                        </Container>
                    </Container>
                </Container>
      </Box>
        </div>
    );
}

export default DeepSearch;