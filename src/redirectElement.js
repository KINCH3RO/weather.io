import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const RedirectElement = (props) => {

    let navigate = useNavigate()
    useEffect(() => {
        navigate('/app/search')
    })

    return (
    <div>
     
    </div>)

}

export default RedirectElement