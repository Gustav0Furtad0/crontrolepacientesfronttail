import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head(props) {
    return (
        <>  
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="language" content="pt-br" />
                <title>{props.title}</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Helmet>
        </>
    );
}