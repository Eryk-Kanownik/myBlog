import React from 'react'

const MostRated = ({mostRated}) => {
    return (
        <div className="mr">
            <p>{mostRated ? "Top 5 Interesting Posts" : "Loading most interesting..."}</p>
        </div>
    )
}

export default MostRated
