import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRemoveSingleItem = this.handleRemoveSingleItem.bind(this);
    this.state = {
      items: []
    };
  }
  
  handleAddItem(newItem) {
    this.setState((prevState) => {
      return {
        items: prevState.items.concat(newItem)
      };
    });
  }
   
  handleReset(e) {
    e.preventDefault();
    
    this.setState(() => {
      return {
        items: []
      };
    });
  }
  
  handleRemoveSingleItem(item) {
    const items = this.state.items;
    const index = items.indexOf(item);
    // TODO: Remove `item` at `index`
    console.log(items.splice(index, 1));
  }
  
  render() {
    return (
      <div>
        <Header title="To Do List"/>
        
        <Items 
          items={this.state.items}
          handleRemoveSingleItem={this.handleRemoveSingleItem}/>
        
        <AddItem 
          handleAddItem={this.handleAddItem}
          handleReset={this.handleReset}/>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

const Items = (props) => {
  return (
    <div className="items">
      {
        props.items.map((item) =>
          <Item
            item={item}
            key={item}
            handleRemoveSingleItem={props.handleRemoveSingleItem}
            />
        )
      }
    </div>
  );
};

const Item = (props) => {
  return (
    <div className="item">
      {props.item}
      <span onClick={() => props.handleRemoveSingleItem(props.item)}><strong>X</strong></span>
    </div>
  );
};

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  
  handleAddItem(e) {
    e.preventDefault();
    
    const newItem = e.target.elements.itemInput.value;
    this.props.handleAddItem(newItem);
    e.target.elements.itemInput.value = '';
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddItem}>
          <input 
            autoComplete="off"
            type="text" 
            name="itemInput" 
            className="addInput"/>
          
          <div className="formButtons">
            <button 
               className="addButton"
               type="submit"> 
               Add Item
            </button>
            <button 
              className="resetButton"
              onClick={this.props.handleReset}>Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));