module.exports = function(){
 //Main Game Component which will hold all the Game inner components
 class Game extends React.Component{
     state = {
        selectedNumbers: [2,4]
     };
     render(){
      return (
          <div className="row">
              <Stars/>
              <Buttons/>
              <Answers selectedNumbers = {this.state.selectedNumbers}/>
              <Numbers/>
          </div>
      );
     }//end:render
 }//end:Game class-component

 const Stars = (props)=>{
     //Create a dynamic number of stars
     const numberOfStars = 1 + Math.floor(Math.random()*9);
     let stars = [];
     for(let i =0; i<numberOfStars;i++){
         stars.push(<i key={i} className="fa fa-star"></i>)
     }
  return (
      <div className="col-lg-5">
          {stars}
      </div>
  );
 };//end:Stars function-component

 const Buttons  = (props)=>{
  return (
      <div className="col-lg-2">
          <button>=</button>
      </div>
  );
 };//end:Buttons function-component

 const Answers = (props)=>{
   return(
       <div className="col-lg-5">
            <div>
                {props.selectedNumbers.map((number,i)=><span key={i}>{number}</span>)}
            </div>
       </div>
   );
 };//end:Answers function-component

 const Numbers = (props)=>{
    return(
        <div className="col-lg-12 numbers-area text-center">
            <div>
                {
                    Numbers.list.map((number,i)=>
                    <span key={i}>{number}</span>
                    )}
            </div>
        </div>
    );
 };//end:Numbers function-component

 //Numbers can also be referenced as objects
 Numbers.list = [1,2,3,4,5,6,7,8,9];
 //If lodash is imported
//  Numbers.list = _.range(1,10);

 class App extends React.Component{
    render(){
        return(
            <div className="container-fluid mainApp">
                <h2>Play Nine...</h2>
                <hr/>
                <Game/>
            </div>
        );
    }//end:render
 }//end:App class-component

ReactDOM.render(<App/>,document.getElementById('mainDiv'));
}//end:Game file