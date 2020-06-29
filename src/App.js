import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person";

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
    const style = {
      // Limited to component but does not have full CSS functionality
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

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
        </div>
    }

    return (
      <div className="App">
        <h1>Hi I'm a react app</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Switch Name
        </button>
        {persons}
      </div>
    );
    // What this will compile to
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m a react app'))
  }
}

export default App;
