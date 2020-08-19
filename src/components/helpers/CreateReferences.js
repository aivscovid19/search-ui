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
     * @param article Object
     * @returns formated array according harvard references format
     */
    static __format = (article) => {
        const example = ["Authors", "Date", "Title", "Journal_Title"];
        return Object.keys(article).sort((a, b) => {
            return example.indexOf(a) - example.indexOf(b);
        });
    }
    /**
     * @public
     * @returns Formated as string
     */
    static toStr(articleInfo) {
        const formated = this.__format(articleInfo);
        let strReference = "";
        formated.forEach((key) => {
            if (articleInfo[key]) { strReference += ` ${key}: ${articleInfo[key]};` }
        });
         return strReference;
     }
    /**
     * @public
     * @returns Formated as JSX element
     */
    static toJSX(articleInfo) {
        const formated = this.__format(articleInfo);
        return(formated.map((key, index) => {
            if (articleInfo[key]) { 
                return <span key={index} style={{ color: "#0d47a1" }}>
                    <span style={{ color: "black"}}>{key}: </span>{articleInfo[key]}; </span>
            }
        }))
    }
}

