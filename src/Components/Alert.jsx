import React from 'react'

const Alert = (props) => {
  const { alert } = props;
  const capitalise = (word) => {
    if(word === "danger"){
      word = "error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return ( 
    <div style={{ height: '50px' }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalise(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert

// {alert && alert.type && (
//   <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
//     <strong>{capitalise(alert.type)}</strong>: {alert.msg}
//   </div>


//  Original-------------------

    // <div style={{height: '50px'}}>
    //     props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    //         <strong>{capitalise(props.alert.type)}</strong>: {props.alert.msg}
    //     </div>
    // </div>