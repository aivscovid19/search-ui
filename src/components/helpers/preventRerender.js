
/**
 * Do not rerender component without props change
 * @param {*} prevProps 
 * @param {*} nextProps 
 * @param  {...any} props array of strings
 */
export const preventRerender = (prevProps, nextProps, ...props) => {
    props.forEach((value) => {
        if (prevProps[props] === nextProps[props]) { return true; }
    });
}
