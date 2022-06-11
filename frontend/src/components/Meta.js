import React from 'react'
import {Helmet} from "react-helmet"

const Meta = ({title , description , keyword}) => {
    return (
        <Helmet>
            <title> {title} </title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title : 'Welcome to E-commerce', 
    description: "one of the best e-commerce web site", 
    keyword : "electronics , by electronics , e-commerce , tunisia"
}


export default Meta
