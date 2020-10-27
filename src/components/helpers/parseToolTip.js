import React from 'react';
import { Tooltip } from '@material-ui/core';

const DUMMY_TIP = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ";

const ToolTipWrapper = ({ title, text, onMouse }) => {
    return (
        <Tooltip title={title}>
            <b onMouseOver={onMouse}>{text}</b>
        </Tooltip>
    )
}

/**
 * @author Danila Kurgan
 * @fileoverview optional funtion for ReactHtmlParser, add toolTip to each bolded word.
 * @param {object} node This is the htmlparser2 node object 
 * @param {boolean} loading
 * @param {string} description Text for ToolTip
 * @param {callBackFunction} stateCallBack update state in parent
 */
const ParseToolTip = ({ node, loading, desciprion, stateCallBack }) => {
    const fetchTip = (query = DUMMY_TIP) => {
        stateCallBack("loading", true);
        // Fetch logic 
        stateCallBack("loading", false);
        stateCallBack("description", query);
    }
    if (node.type === 'tag' && node.name === 'b') {
        let highlightedText = node.children[0].data;
        return (
            <>
                {(!loading && !desciprion) ? <ToolTipWrapper onMouse={() => fetchTip()}
                    title="loading" text={highlightedText} /> :
                    <ToolTipWrapper title={desciprion} text={highlightedText}
                    />}
            </>
        )
    }
    return undefined;
}

export default ParseToolTip;
