import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head(props) {
    return (
        <>  
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Helmet>
            
        </>
    );
}