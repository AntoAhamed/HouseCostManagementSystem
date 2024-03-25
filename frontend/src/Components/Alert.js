import React from 'react'

function Alert(props) {
    return (
        <div class="alert alert-warning" role="alert" style={{marginTop: '10%'}}>
            {props.alertMssg}
        </div>
    )
}

export default Alert
