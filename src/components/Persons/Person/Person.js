import React, {Component, Fragment} from "react";
import classes from './Person.css'
import Aux from './../../../hoc/Aux'
import withClass from './../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from './../../../context/auth-context'

class Person extends Component {

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  // const style = {  // Radium
  //   'media (min-width: 500px)': {
  //     width: '450px'
  //   }
  // };

  // const StyledDiv = styled.div` // Styled Components
  //   width: 60%;
  //   margin: 16px auto;
  //   border: 1px solid #eee;
  //   box-shadow: 0 2px 3px #ccc;
  //   padding: 16px;
  //   text-align: center;
  //
  //   @media(min-width: 500px) {
  //       width: 450px
  //   }
  // `;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    console.log('[Person.js] rendering...');
    return (
      // <div className={classes.Person}>
      <Aux>
        {/*<AuthContext.Consumer>*/}
        {this.context.authenticated ? <p>Authenticated</p> : <p>Please Log in</p>}
        {/*</AuthContext.Consumer>*/}
        {/* <Fragment> // Fragment works exactly as the made up Aux Component*/}
        <p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input
          type="text"
          // ref={(inputEl) => {this.inputElement = inputEl}} // ref only works in class based
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}
        />
       </Aux>
    )
  };
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

// export default Radium(person);
export default withClass(Person, classes.Person);