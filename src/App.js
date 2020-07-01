import React, { Component } from 'react';
// import Radium, { StyleRoot } from "radium";
// import styled from "styled-components";
import './App.css';
import Person from "./Person/Person";

// const StyledButton = styled.button`
//     background-color: ${props => props.alt ? 'red' : 'green'};
//     color: white;
//     font: inherit;
//     border: 1px solid blue;
//     padding: 8px;
//     cursor: pointer;
//
//     &:hover {
//       background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//       color: black;
//     }
// `;

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.slice(); // Does the same as below
    const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({persons: persons});
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    const person = {...this.state.persons[personIndex]};
    //Alternatively
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  };

  render() {
    // const style = {
    //   // Limited to component but does not have full CSS functionality
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let persons = null;
    if(this.state.showPersons){
      persons =
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              key={person.id}  // This key element allows for efficient dom rendering, i.e. not full map rerender
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
          })}
        </div>;

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //     color: 'black'
      // }
    }

    const classes = [];
    if(this.state.persons.length <= 2 ){
      classes.push('red')
    }
    if(this.state.persons.length <= 1 ){
      classes.push('bold')
    }


    return (
      // <StyleRoot> // Radium styling for media queries
        <div className="App">
          <h1>Hi I'm a react app</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button
            // alt={this.state.showPersons} // For Styled Components
            onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>
          {persons}
        </div>
      // </StyleRoot>
    );
    // What this will compile to
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m a react app'))
  }
}

// export default Radium(App);
export default App