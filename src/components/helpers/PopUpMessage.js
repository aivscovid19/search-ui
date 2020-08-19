import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Typography, Modal, Backdrop, Fade, Divider } from '@material-ui/core';


/**
 *  Showing pop up message in the middle of page with faded background
 *  @author[Danila Kurgan](https://github.com/dkurgan)
 */


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    paper: {
        width: "450px",
        fontFamily: "Lato,sans-serif",
        fontWeight: "350",
        height: "270px",
        backgroundColor: "#f4f4f4",
        borderRadius: "12px",
        padding: "20px",
        display: 'flex',
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
        outline: "none"
    },
    
}));

/**
 * @param visibility Boolean allow message to apear
 * @param title String title of message
 * @param onClose CallBack Function update state in parent
 * @param content String body text
 * @param id String special case for id of article
 * @param footer String text at bottom seperated with divider from content
 * @param href String link
 */
export const PopUpMessage = ({ visibility, title, onClose, content, id, footer, href}) => {
    const classes = useStyles();
    const [copied, setCopy] = useState(false);
    const handleRedirect = (copy) => {
        if (!href) return;
        /**
         * Copy article id in to user clipboard and show message about it
         */
        if (copy) {
            setCopy(true);
            navigator.clipboard.writeText(id);
            setTimeout(() => setCopy(false), 3000);
        }
        setTimeout(() => {
            const win = window.open(href, '_blank');
            if (win !== null) win.focus();
        }, 1500)
    }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
              className={classes.modal}
        open={visibility}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visibility}>
                  <div className={classes.paper}>
                      <HighlightOffIcon style={{ alignSelf: "flex-end", color: "grey", cursor: "pointer"}} onClick={onClose}/>
                      <h1 style={{fontSize: "1.8rem", margin: "0px", fontWeight: "450"}}>{title}</h1>
                      {id ? <h3 style={{ fontSize: "2rem", fontWeight: "520", cursor: "pointer", marginBottom: "10px" }}
                          onClick={() => handleRedirect(true)}>Article id: <span style={{ color: "#0d47a1" }}>{id}</span></h3>
                          : null}
                          <Typography style={{ fontWeight: "500" }} onClick={handleRedirect}>{content}</Typography>
                      {copied ? <Typography style={{ backgroundColor: "darkgrey", color: "#fff", borderRadius: "12px", width: "100px",alignSelf: "center", marginTop: "2px" }}>
                          Copied!</Typography> : null}
                      {footer ? <Divider variant="middle" style={{marginTop: "12px"}} /> : null}
                      <Typography style={{fontWeight: "400", marginTop: "15px"}}>{footer}</Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

PopUpMessage.propTypes = {
    visibility: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
    footer: PropTypes.string,
    href: PropTypes.string,
}