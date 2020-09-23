import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';

/**
 * @params pageNumber
 * @params fetchPage function callback
 * @params seach qeury
 * @author[Danila Kurgan](https://github.com/dkurgan)
 */

const PAGE_COUNT = 8;

const useStyle = makeStyles(() => ({
    barWraper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: "10px"
    },
    buttonWraper: {
        margin: "10px"
    },
    button: {
        width: "40px",
        fontSize: "1.1rem",
        background: "#ffff",
        color: "#0c3877",
        cursor: "pointer"
    },
    selected: {
        fontWeight: "700",
        borderBottom: "2px solid #0c3877",
        padding: "2px"
    }
}))

export const PagesBar = ({pageNumber, fetchPage, search}) => {
    const classes = useStyle();
    let pageNumberList = [];
    pageNumberList.push(pageNumber);
    for (let index = 1; index < PAGE_COUNT; index++) { pageNumberList.push(pageNumberList[index - 1] + 1 ); }
    const changePage = (numPage) => {
        if (numPage === pageNumber) return;
        else {fetchPage(search, false, numPage);}
    }
    const skipPage = (way) => {
        if (!way) {fetchPage(search, false, (pageNumber - PAGE_COUNT) > 0 ? (pageNumber - PAGE_COUNT) : 0);}
        else {fetchPage(search, false, (pageNumber + PAGE_COUNT));}
    }
    return (
        <Box className={classes.container}>
            <Box className={classes.barWraper}>
                {pageNumber > 1 ? (<ArrowBackIosIcon onClick={(e) => skipPage(false)} style={{
                    marginTop: "10px", color: "lightgrey",
                    cursor: "pointer"
                }} />) : null}
            {pageNumberList.map((val, index) => {
                return (<Box key={index} className={classes.buttonWraper}>
                    <a className={classes.button} onClick={() => changePage(val)}>{
                        val === pageNumber ? <b className={classes.selected}>{val}</b> : val}</a>
                </Box>)
            })}
                <ArrowForwardIosIcon style={{ marginTop: "10px", color: "lightgrey", cursor: "pointer" }}
                    onClick={(e) => skipPage(true)} />
            </Box>
        </Box>
    )
}

PagesBar.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    fetchPage: PropTypes.func.isRequired,
    search: PropTypes.string
}
