[virtual_dom]: C:/atom_workspace/react_basics/images/VirtualDom_JSX.PNG "Virtual Dom"

# React Basics (Pluralsight)

Some Mordern Javascript Learning Practices [https://jscomplete.com/learn-javascript](https://jscomplete.com/learn-javascript)

# What is React ?
REACT is a javascript library for building  user interfaces. 
- It is a Library not a framework. It's small and not a complete solution. It does not assume on other technologies.
- It builds user interfaces excellantly. If a device/interface can understand JS, then we can use REACT.
- It has a DOM library. without React, We need to use native javascript libraries.
- It helps in serving Dynamic data. It is a `V` in `MVC`
    - This is an ok analogy, React + GraphQL challenges `MVC`


# What are the three main categories in React ? 
React has 3 main categories:
- `Components` - Simple functions in any programming language.
    - has properties and state
    - Components can contain components
    - Unlike primitive functions, a full React Components can have a `private` State.

# React's approach - Write HTML in JS
By writing HTML in JS, React creates, what is termed as - `Virtual DOM` in memory. React uses this concept to render the HTML virtually, then keeps updating instead of the whole tree, only changes the changed part.

# Components in React

Components are of 2 types in React
- Function Component.
    - It is the simplest form of a React Component
    - Function Component = props.

```javascript

const MyComponent = (props) => {
    return(
        <elementComponent ../>
    );
}

```

---

- Class Component.
    - A Class component, is a more featured way to define React Component.
    - Class Component = props + private additional state.
    - State and Props have one important difference. The state can be changed, but the props are all fixed values.
    - Class component can only change their internal state and not the props.

```javascript

class MyComponent extends React.Component{
    render(){
        return(
            <elementOrComponent.../>
        );
    }
}//end-class:MyComponent

```

# Virtual Dom in REACT: 

![alt text][virtual_dom]

> *Virtual DOM using JSX (left) and how react interprates it (right)*

---

# Simple React code with Function Component

Basic React Code, containing a custom Button component with just one property called `label`

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

const Button = (props) =>{
	return(
      <button>{props.label}</button>
  );
};//end:executeMe

ReactDOM.render(<Button label="Props"/>, mountNode); 
//first param-JS variable, second param-Element Node in which we need to render
//The Title case `Button` is a requirement in React. So it can distinguish button and Button keywords.

```

# The Same Code using the Class Component

>Note: If you need to add any interactivity to the Button, it belongs to the state of the component.

Using React with a Class Component

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
// using constructor to define the state.
constructor(props){
	super(props);
  this.state = {counter:9};
}//end:constructor
	render(){
  	return(
    	<button>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

ReactDOM.render(<Button />, mountNode); 
```

The Above Class Component can be re-written without the `constrcutor function` or `super` keywords. This is not yet part of the official Javascript language, but it can be implemented in the future. It works because of `Babel.js` to transpile the mordern code to native javascript.

```javascript
class Button extends React.Component {
// Using Babel.js, we are transpiling this to primitive javascript
state = {counter:9}; // Writing state property without using any constructor

	render(){
  	return(
    	<button>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

ReactDOM.render(<Button />, mountNode); 
```

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
handleClick = ()=>{
	//this === component instance
  //this.state.counter++
  //Use react's this.setState which is available on every class Component
  //NOTE: remember setState is an a-synchronous call. Race conditions can happen.
  this.setState({
  counter:this.state.counter+1
  });
};//end:handleClick
	render(){
  	return(
    	<button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

ReactDOM.render(<Button />, mountNode); 

```
>NOTE: The General rule of thumb is: Whenever you need to update a state, `from the value of the current state`, `setState()` can trigger RACE conditions. Therefore use the other contract of the `setState method` OR use the overloaded setState method, which takes in a parameter - `prevState`

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
handleClick = ()=>{
	//this === component instance
  //this.state.counter++
  //Use react's this.setState which is available on every class Component
  //NOTE: remember setState is an a-synchronous call. Race conditions can happen.
  // This time we are using function instead of the object, the prevState object is called.
  this.setState((prevState)=>{
  	return {
    	counter:prevState.counter + 1
    };
  });//This time it takes a function instead of an argument
};//end:handleClick
	render(){
  	return(
    	<button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

ReactDOM.render(<Button />, mountNode); 
```

> NOTE: infact, we can even remove the return statement in the setState by surrounding the anonymous function in paranthesis.

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
handleClick = ()=>{
	//this === component instance
  //this.state.counter++
  //Use react's this.setState which is available on every class Component
  //NOTE: remember setState is an a-synchronous call. Race conditions can happen.
  this.setState((prevState)=>({  	
    	counter:prevState.counter + 1    //No return call - instead wrap the block in paranthesis
  }));//This time it takes a function instead of an argument
};//end:handleClick
	render(){
  	return(
    	<button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

ReactDOM.render(<Button />, mountNode); 
```

# Reusable Components in React

To `include` multiple component, you need to group the multiple component inside one component, namely `App`

`NOTE: React CAN only return ONE ELEMENT. Also it cannot have multiple return values (unless conditional logic applies)....`
---

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
handleClick = ()=>{
	//this === component instance
  //this.state.counter++
  //Use react's this.setState which is available on every class Component
  //NOTE: remember setState is an a-synchronous call. Race conditions can happen.
  this.setState((prevState)=>({  	
    	counter:prevState.counter + 1    
  }));//This time it takes a function instead of an argument
};//end:handleClick
	render(){
  	return(
    	<button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }//end:render
}//end-class:Button	

//Define a Result Component
const Result = (props) => {
	return(
  <div>....</div>
  );
}//end:Result function component

//This is a parent component which wraps both the child components and is rendered using ReactDOM
class App extends React.Component{
render(){
	//NOTE: You can only have one return, unless conditional logic applies
  //NOTE: Your return function should have one Wrapper div element, As it can only return ONE ELEMENT
	return(  
  // Use of this wrapper div element is not optional
  <div> 
  	<Button/>
    <Result/>
  </div>
  );
}//end:render

}//end-class:App

ReactDOM.render(<App />, mountNode); 

```

`NOTE: The state of the Component is only accessible by the same Component and no one else`
---

# Making the counter to be communicated across both the components

To make the counter accessible across both the component, We need to move the internal state component of the `Button` component one level up.

Let's add the state.counter to the `App` component.

>NOTE: on a simple `functional component`, we just pass the props as a parameter to the function and invoke using `props.counter`
>NOTE: on a `class component`, We define the state as a field variable and then pass it to the render function

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
// handleClick = ()=>{
	
//   this.setState((prevState)=>({  	
//     	counter:prevState.counter + 1    
//   }));//This time it takes a function instead of an argument
// };//end:handleClick


	render(){
  	return(
    	<button onClick={this.props.onClickFunction}>
      +1
      </button>
    );
  }//end:render
}//end-class:Button	

//Define a Result Component
const Result = (props) => {
	return(
  <div>{props.counter}</div>
  );
}//end:Result function component

//This is a parent component which wraps both the child components and is rendered using ReactDOM
class App extends React.Component{
state = {counter:0}; // So that state.counter can be accessible across both Button and Result.

incrementCounter = () =>{
	this.setState((prevState)=>({
  counter:prevState.counter+1
  }));
}
render(){
	//NOTE: You can only have one return, unless conditional logic applies
  //NOTE: Your return function should have one Wrapper div element, As it can only return ONE ELEMENT
	return(  
  // Use of this wrapper div element is not optional
  <div> 
  	<Button onClickFunction = {this.incrementCounter}/>
    <Result counter={this.state.counter}/>
  </div>
  );
}//end:render

}//end-class:App

ReactDOM.render(<App />, mountNode); 

```

`NOTE: Here the state change is not happening in Button or the Result component, but in the App component`
---

## The Component where you define the `state change` is an important decision when designing your React Application.

The following code will now reuse the Button component by dynamically assigning the Value

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
// handleClick = ()=>{
	
//   this.setState((prevState)=>({  	
//     	counter:prevState.counter + 1    
//   }));//This time it takes a function instead of an argument
// };//end:handleClick


	render(){
  	return(
      //This is an example of the closure function
    	<button onClick={()=>this.props.onClickFunction(this.props.incrementValue)}> 
      +{this.props.incrementValue}
      </button>
    );
  }//end:render
}//end-class:Button	

//Define a Result Component
const Result = (props) => {
	return(
  <div>{props.counter}</div>
  );
}//end:Result function component

//This is a parent component which wraps both the child components and is rendered using ReactDOM
class App extends React.Component{
state = {counter:0}; // So that state.counter can be accessible across both Button and Result.

incrementCounter = (value) =>{
	this.setState((prevState)=>({
  counter:prevState.counter+value
  }));
}
render(){
	//NOTE: You can only have one return, unless conditional logic applies
  //NOTE: Your return function should have one Wrapper div element, As it can only return ONE ELEMENT
	return(  
  // Use of this wrapper div element is not optional
  <div> 
  	<Button incrementValue = {1} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {5} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {10} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {100} onClickFunction = {this.incrementCounter}/>
    <Result counter={this.state.counter}/>
  </div>
  );
}//end:render

}//end-class:App

ReactDOM.render(<App />, mountNode); 

```

---

# Simpler way of Programming React Components

The above method of using Closures is tedious and difficult to understand. Therefore a much simpler method would be as follows:

```javascript
// write code here and click the execute button
//React, React DOM editors available here !
mountNode.innerHTML = "Hello World";

class Button extends React.Component {
state = {counter:0}; // Using Babel.js, we are transpiling this to primitive javascript

//We can use variable function injection on an instance property
handleClick = ()=>{	
  this.props.onClickFunction(this.props.incrementValue)
};//end:handleClick


	render(){
  	return(
    	<button onClick={this.handleClick}>
      +{this.props.incrementValue}
      </button>
    );
  }//end:render
}//end-class:Button	

//Define a Result Component
const Result = (props) => {
	return(
  <div>{props.counter}</div>
  );
}//end:Result function component

//This is a parent component which wraps both the child components and is rendered using ReactDOM
class App extends React.Component{
state = {counter:0}; // So that state.counter can be accessible across both Button and Result.

incrementCounter = (value) =>{
	this.setState((prevState)=>({
  counter:prevState.counter+value
  }));
}
render(){
	//NOTE: You can only have one return, unless conditional logic applies
  //NOTE: Your return function should have one Wrapper div element, As it can only return ONE ELEMENT
	return(  
  // Use of this wrapper div element is not optional
  <div> 
  	<Button incrementValue = {1} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {5} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {10} onClickFunction = {this.incrementCounter}/>
  	<Button incrementValue = {100} onClickFunction = {this.incrementCounter}/>
    <Result counter={this.state.counter}/>
  </div>
  );
}//end:render

}//end-class:App

ReactDOM.render(<App />, mountNode); 

```

# Designing a React Application

Before you need to construct a React Application, you need to design your React architecture.

- `const` Card = ....
- `const` CardList = ....

- Define a component as a `function` component only if it meets the following cirteria:
  - The component is used only for presentation.
  - The component does not require any interactivity.
  - The component is NOT a top level / parent component.

# Giving DOM property names in React

In HTML, the property `class` is written as `className` in react when it comes to defining components

```javascript
const Card = (props)=>{
	return(
    // In React, the DOM interpretation of class is className
  <div>
  	<img src="http://placehold.it/75" />
    <div>    
    	<div className="info">Name here ...</div>
      <div>Company name here ....</div>
    </div>
  </div>
  );
}//end:Card-function component
ReactDOM.render(<Card/>,mountNode);
```

```css
#mountNode {
  color: #000;
}

.info{
color:red;
}
```

React Also ships with a `style` property which takes in an `Inline Style` with it

```javascript
const Card = (props)=>{
	return(
    // Inline styles can be added as style property
  <div style={{dislay:inline-block; border:1px solid red}}>
  	<img src="http://placehold.it/75" />
    <div>
    	<div className="info">Name here ...</div>
      <div>Company name here ....</div>
    </div>
  </div>
  );
}//end:Card-function component
ReactDOM.render(<Card/>,mountNode);
```

# Creating ng-repeat of Angular in React Style

In React, Components can be displayed in a loop, by doing the following:

1. Wrapping the Components in a parent component
1. Associating an Array/JSON to the Parent component property 
1. Using `{props.cards.map(card => <Card (...card)/>)}`

```javascript
const Card = (props)=>{
	return(
  <div>
  	<img width="75" src={props.avatar_url} />
    <div style={{display:'inline-block', padding:'5px'}}>
    	<div className="info">{props.name}</div>
      <div>{props.company}</div>
    </div>
  </div>
  );
}//end:Card-function component

let data = [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
];

const CardList = (props)=>{
return (
  //If all the properties are defined the same way, use the variable operator ...
	<div>
  {props.cards.map(card => <Card {...card}/>)}
  </div>
);
	
}//end:CarList-function component

ReactDOM.render(<CardList cards={data}/>,mountNode);
```

# Handling React DOM inputs / Data

### Every React EVENT function, recieves an `event` argument

You can get the input using two days:
1. document.getElementById('');
1. ref: takes in a function with an argument called input in which you can assign a instance value.
>  `ref={(input) => this.userNameInput = input}`

```javascript
const Card = (props)=>{
	return(
  <div>
  	<img width="75" src={props.avatar_url} />
    <div style={{display:'inline-block', padding:'5px'}}>
    	<div className="info">{props.name}</div>
      <div>{props.company}</div>
    </div>
  </div>
  );
}//end:Card-function component

let data = [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
];

const CardList = (props)=>{
return (
	<div>
  {props.cards.map(card => <Card {...card}/>)}
  </div>
);
	
}//end:CarList-function component

class Form extends React.Component{
	handleSubmit = (event) => {
  	event.preventDefault(); //prevent the default submit event function
    console.log('Form submitted: ', this.userNameInput.value);
  };//end:handleSubmit 
	render (){
  	return(
    <form onSubmit={this.handleSubmit}>
    	<input type="text" 
      ref={(input) => this.userNameInput = input}
      placeholder="Github username" required/>
      <button type="submit">Add User</button>
    </form>
    );
  }
}//end:Form-class component

//Main Parent Wrapper Component which holds all the components together
class App extends React.Component{
state ={
	data : [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
]
};
	render(){
  	return(
    <div>
    	<Form/>
    	<CardList cards={this.state.data}/>      
    </div>
    );
  }
}//end:App-class component


ReactDOM.render(<App />,mountNode);
```

# React's controlled components over the normal DOM input validation

Now the same above code can be re-written using the React's controlled component.
- value
- onChange

```javascript
value = {this.state.userName}
onChange = {(event) => this.setState({userName:event.target.value})}
```

```javascript
const Card = (props)=>{
	return(
  <div>
  	<img width="75" src={props.avatar_url} />
    <div style={{display:'inline-block', padding:'5px'}}>
    	<div className="info">{props.name}</div>
      <div>{props.company}</div>
    </div>
  </div>
  );
}//end:Card-function component

let data = [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
];

const CardList = (props)=>{
return (
	<div>
  {props.cards.map(card => <Card {...card}/>)}
  </div>
);
	
}//end:CarList-function component

class Form extends React.Component{
	state = {userName:''}
	handleSubmit = (event) => {
  	event.preventDefault(); //prevent the default submit event function
    console.log('Form submitted: ', this.state.userName);
    //Calling the axios AJAX library very similar to - $http of Angular
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(response => {
    	console.log('Returned response is: ', response);
    });
  };//end:handleSubmit 
	render (){
  	return(
    <form onSubmit={this.handleSubmit}>
    	<input type="text" 
      value = {this.state.userName}
      onChange = {(event) => this.setState({userName:event.target.value})}
      placeholder="Github username" required/>
      <button type="submit">Add User</button>
    </form>
    );
  }
}//end:Form-class component

//Main Parent Wrapper Component which holds all the components together
class App extends React.Component{
state ={
	data : [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
]
};
	render(){
  	return(
    <div>
    	<Form/>
    	<CardList cards={this.state.data}/>      
    </div>
    );
  }
}//end:App-class component


ReactDOM.render(<App />,mountNode);
```

# Communicating message from a Child Component to a Parent Component

> - In React, A child component cannot access directly - The state of the Parent Component
> - React components have one way flow data
> - But the Parent component can pass properties (which are `Objects` - `call by reference`).
> - Those properties can be simple primitive values. or `Functional variable references`

# Steps to communicate between a Child Component and Parent Component

1. DEFINE a function / method in the Parent component

```javascript
class App extends React.Component{
  ...
  ...
  ...
  addNewCard = (cardInfo) =>{
	  console.log('Value is now in the Parent component: ', cardInfo);
  };//end:addNewCard
} //end:App-class Component
```

2. Now pass the `REFERENCE` of the `addNewCard` function to one of the props of the Child Component

```javascript
class App extends React.Component{
  ....
  ....
  ....
  render(){
  	return(
    //Note: prop onSubmit has ONLY the reference of the function, not invoking/calling the function
    <div>
    	<Form onSubmit = {this.addNewCard}/>
    	<CardList cards={this.state.data}/>      
    </div>
    );
  }//end:render
}//end:App-class component


}//end:App-class Component
```

3. Invoke the function by passing the result value/object/JSON response in the Child Component

```javascript

class Form extends React.Componet{  
	state = {userName:''}
	handleSubmit = (event) => {
  	event.preventDefault(); //prevent the default submit event function
    console.log('Form submitted: ', this.state.userName);
    //Calling the axios AJAX library very similar to - $http of Angular
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(response => {
    	//console.log('Returned response is: ', response);
      this.props.onSubmit(response.data); // This is where we are invoking the handleSubmit function and passing a dynamic value
      this.setState({userName:''});
    });
  };//end:handleSubmit 
  ....
  ....
  ....
  ....
}//end:Form-class component
```

## Writing it all Together...

```javascript
const Card = (props)=>{
	return(
  <div>
  	<img width="75" src={props.avatar_url} />
    <div style={{display:'inline-block', padding:'5px'}}>
    	<div className="info">{props.name}</div>
      <div>{props.company}</div>
    </div>
  </div>
  );
}//end:Card-function component

let data = [
	{
  	name:"avj2352",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies"
  },
  {
  	name:"pramod",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies2"
  },
  {
  	name:"ananth",
    avatar_url:"https://avatars2.githubusercontent.com/u/6997529?v=3/75",
    company:"Innovoskies3"
  }
];

const CardList = (props)=>{
return (
	<div>
  {props.cards.map(card => <Card key={card.id}{...card}/>)}
  </div>
);
	
}//end:CarList-function component

class Form extends React.Component{
	state = {userName:''}
	handleSubmit = (event) => {
  	event.preventDefault(); //prevent the default submit event function
    console.log('Form submitted: ', this.state.userName);
    //Calling the axios AJAX library very similar to - $http of Angular
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(response => {
    	//console.log('Returned response is: ', response);
      this.props.onSubmit(response.data);
      this.setState({userName:''});
    });
  };//end:handleSubmit 
	render (){
  	return(
    <form onSubmit={this.handleSubmit}>
    	<input type="text" 
      value = {this.state.userName}
      //NOTE: event is the argument, event.target is the element form itself
      onChange = {(event) => this.setState({userName:event.target.value})}
      placeholder="Github username" required/>
      <button type="submit">Add User</button>
    </form>
    );
  }
}//end:Form-class component

//Main Parent Wrapper Component which holds all the components together
class App extends React.Component{
state ={
	cards : []
};

addNewCard = (cardInfo) =>{
	//console.log('Value is now in the Parent component: ', cardInfo);
  this.setState(prevState => ({
  	cards:prevState.cards.concat(cardInfo)
  }))
};//end:addNewCard

	render(){
  	return(
    //Note: prop onSubmit has ONLY the reference of the function, not invoking/calling the function
    <div>
    	<Form onSubmit = {this.addNewCard}/>
    	<CardList cards={this.state.cards}/>      
    </div>
    );
  }
}//end:App-class component


ReactDOM.render(<App />,mountNode);
```

