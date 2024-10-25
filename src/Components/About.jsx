import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    return (
      <div>
        This is About page.
      </div>
    );  
}

export default About;

// useEffect(() => {
//   a.update();
// }, []);

// return (
//   <div>
//     Name : {a.state.name} , Class : {a.state.class}
//   </div>
// );