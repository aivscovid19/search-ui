import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Result} from '../../quickSearchPage/results';
import {Box, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {fetchDeepSearchResult} from '../../../controllers/dataFetch';
import Spinner from '../../helpers/LoadingSpiner';
/**
 * * @author[Danila Kurgan](https://github.com/dkurgan);
*/
const useStyles = makeStyles(() => ({
    header: {
        textAlign: "center",
        marginBottom: "10px"
    },
    headerBody: {
        textAlign: "center",
        marginBottom: "10px"
    },
    results: {
        height: '100%',
        overflow: 'scroll',
        padding: "0px"
    },
    main: {
        margin: "auto",
        width: "80%"
    }
  }));
export const DeepSearchResult = () => {
    const {id} = useParams();
    const [idError, setIdEror] = useState(false);
    const [pendingMessage, setPendingMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [docs, setDocs] = useState([]);
    const classes = useStyles();
    useEffect(async() => {
        setLoading(true);
        try {
            const { data } = await fetchDeepSearchResult(id);
            if (data) setDocs(data);
            setLoading(false);   
        } catch (error) {
            setLoading(false);
            setIdEror(true);
        }
        if (docs.length === undefined || docs.status === null) { setIdEror(true); }
        else if (docs && docs.status === 'in progress') {
                setPendingMessage(true);}
    }, []);
    return (
        <div>
            {!loading ? (!idError ? (!pendingMessage ?
                <Box className={classes.main}>
                    <h2 className={classes.header}>{docs.name ? `Hello ${docs.name}`: `Hello` }</h2>
                    <Typography className={classes.headerBody}>Here what we found on your request</Typography>
                    <Box className={classes.results}>
                    {console.log(docs)}
                        { docs.docs ? docs.docs.map((d, index) => {
                            if (index > 19) return;
                            else return (
                                <Box key={index} mb={2}>
                                    <Result d={d} showKeywords={false} showReport={false}
                                    />
                                </Box>)}) : null}
                    </Box>
                </Box> :
                (<div>
                    <h2 className={classes.header} style={{color: 'grey'}}>Oops, we are not ready yet</h2>
                    <Typography className={classes.headerBody}
                        style={{ color: 'grey' }}
                    >At this time we are still proccesing your request, please comeback later</Typography>
                        </div>)
                 ) : (<div>
                    <h2 className={classes.header} style={{color: 'grey'}}>Oops, we cannot find anything</h2>
                    <Typography className={classes.headerBody}
                        style={{ color: 'grey' }}
                    >Maybe at this time we are havent start proccess your request</Typography>
                        </div>)
                ): <Spinner mt="150px" height="100px" width="auto" color="grey" type="BallTriangle"/>}
            </div > 
    )
}
