import React from 'react';
import PropTypes from 'prop-types';

/**
 * Converting object to journal article reference format
 * @param articleInfo Object
 * @example https://libraryguides.vu.edu.au/harvard/journal-articles
 * @author[Danila Kurgan](https://github.com/dkurgan)
 */

export class CreateReferences {
    static PropTypes = {
        articleInfo: PropTypes.object.isRequired
    }
    /**
     * @private 
     * @returns formated array according harvard references format
     */
    static __format(){
        const example = ["Authors", "Date", "Title", "Journal_Title"];
        return example;
    }
    /**
     * @public
     * @returns Formated as string
     */
    static toStr(articleInfo) {
        const formated = this.__format();
        let strReference = "";
        formated.forEach((key) => {
            if (articleInfo[key.toLowerCase()]) { strReference += ` ${key}: ${articleInfo[key.toLowerCase()]};` }
        });
         return strReference;
     }
    /**
     * @public
     * @returns Formated as JSX element
     */
    static toJSX(articleInfo) {
        const formated = this.__format();
        return (formated.map((key, index) => {
            if (articleInfo[key.toLowerCase()]) { 
                return <span key={index} style={{ color: "#0d47a1" }}>
                    <span style={{ color: "black"}}>{key}: </span>{articleInfo[key.toLowerCase()]}; </span>
            }
        }))
    }
}

