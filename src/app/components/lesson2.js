module.exports = function(){
 //Main Game Component which will hold all the Game inner components
 class Game extends React.Component{
     render(){
      return (
          <div>
              <Stars/>
              <Buttons/>
              <Answers/>
          </div>
      );
     }//end:render
 }//end:Game class-component

 const Stars = (props)=>{
  return (
      <div>Stars....</div>
  );
 };//end:Stars function-component

 const Buttons  = (props)=>{
  return (
      <div>Buttons...</div>
  );
 };//end:Buttons function-component

 const Answers = (props)=>{
   return(
       <div>Answers...</div>
   );
 };//end:Answers function-component

 class App extends React.Component{
    render(){
        return(
            <div className="col-lg-12 mainApp">
                <h1>Play Nine...</h1>
                <Game/>
            </div>
        );
    }//end:render
 }//end:App class-component

ReactDOM.render(<App/>,document.getElementById('mainDiv'));
}//end:Game file