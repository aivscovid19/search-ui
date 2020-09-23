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
        textAlign: "center"
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
    const [data, setData] = useState({});
    const [docs, setDocs] = useState([]);
    const [pendingMessage, setPendingMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetchDeepSearchResult(id);
          setData(response.data);
          setDocs(response.data.docs);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setIdEror(true);
        }
        if (data.status === null) {
          setIdEror(true);
        } else if (data && data.status === 'in progress') {
          setPendingMessage(true);
        }
      }
      fetchData();
    }, []);
    return (
        <div>
            {!loading ? (!idError ? (!pendingMessage ?
                <Box className={classes.main}>
                    <h2 className={classes.header}>{data.name ? `Hello ${data.name}`: `Hello` }</h2>
                    <Typography className={classes.headerBody}>Here what we can find on your request</Typography>
                    <Box className={classes.results}>
                        {docs.map((d, index) => {
                            if (index > 19) return;
                            else return (
                                <Box key={index} mb={2}>
                                    <Result d={d} showKeywords={false} showReport={false}
                                    />
                                </Box>)})}
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
