import React, { useEffect, useRef, useContext } from 'react'
import classes from "./Cockpit.css";
import AuthContext from './../../context/auth-context'

const cockpit = props => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    // const timer = setTimeout(() => {
    //   alert('Saved data to cloud!')
    // }, 1000);
    toggleBtnRef.current.click();
    return () => { // This will run when the component gets destroyed because of the [] second argument
      // clearTimeout(timer); // Cleanup the timer
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, []); // [] is only run initially, [props.persons] would be run on any change to props.persons

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => { // This will run on any change after its done
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    }
  });

  let btnClasses = '';
  if(props.showPersons){
    btnClasses = classes.Red;
  }

  const assignedClasses = [];
  if(props.personsLength <= 2 ){
    assignedClasses.push(classes.red)
  }
  if(props.personsLength <= 1 ){
    assignedClasses.push(classes.bold)
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button
        // alt={this.state.showPersons} // For Styled Components
        ref={toggleBtnRef}
        className={btnClasses}
        onClick={props.clicked}>
        Toggle Persons
      </button>
      {/*<AuthContext.Consumer>*/}
        {<button onClick={authContext.login}>Log in</button>}
      {/*</AuthContext.Consumer>*/}
    </div>
  )
};

// For functional components to stop rerendering when not needed i.e. shouldComponentUpdate
export default React.memo(cockpit);