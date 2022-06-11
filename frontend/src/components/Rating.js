import React from 'react'
import PropTypes from 'prop-types'

export const Rating = ({value , text , color}) => {
    return (
        <>
           <span style={{color}}
                className={
                    value >= 1 ? "fas fa-star"
                    :  value >= 0.5 ? "fas fa-star-half-alt"
                    :  "far fa-star"
                }
           ></span>
            <span style={{color}}
                className={
                    value >= 2 ? "fas fa-star"
                    :  value >= 1.5 ? "fas fa-star-half-alt"
                    :  "far fa-star"
                }
           ></span>
           <span style={{color}}
                className={
                    value >= 3 ? "fas fa-star"
                    :  value >= 2.5 ? "fas fa-star-half-alt"
                    :  "far fa-star"
                }
           ></span>
           <span style={{color}}
                className={
                    value >= 4 ? "fas fa-star"
                    :  value >= 3.5 ? "fas fa-star-half-alt"
                    :  "far fa-star"
                }
           ></span>
           <span style={{color}}
                className={
                    value >= 5 ? "fas fa-star"
                    :  value >= 4.5 ? "fas fa-star-half-alt"
                    :  "far fa-star"
                }
           ></span>
            <span className="m-auto"> {text || '' } </span>
        </>
    )
}

Rating.defaultProps = {
    color : '#f8e825',
}
Rating.propTypes = {
    value : PropTypes.number,
    text : PropTypes.string, 
    color : PropTypes.string
}
export default Rating
