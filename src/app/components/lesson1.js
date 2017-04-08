module.exports = function(){
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
    // console.log('Form submitted: ', this.state.userName);
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
    <div className="mainApp">
    	<Form onSubmit = {this.addNewCard}/>
    	<CardList cards={this.state.cards}/>      
    </div>
    );
  }
}//end:App-class component

ReactDOM.render(<App />,document.getElementById('mainDiv'));
}