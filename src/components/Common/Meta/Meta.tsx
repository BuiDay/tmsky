import React from 'react';
import {Helmet} from "react-helmet";
interface Iprops{
    title?:string
}
const Meta:React.FC<Iprops> = (props) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
        </Helmet>
    );
};

export default Meta;