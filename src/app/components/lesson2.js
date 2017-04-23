module.exports = function(){
 //Main Game Component which will hold all the Game inner components
 class Game extends React.Component{
     state = {
        selectedNumbers: [],
        numberOfStars : 1 + Math.floor(Math.random()*9)
     };

     selectNumber = (clickedNumber)=>{
         if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){return;}
        //NOTE: This piece of logic is to avoid race conditions
        this.setState(prevState=>({
            selectedNumbers:prevState.selectedNumbers.concat(clickedNumber),
        }));//end:setState
     }//end:selectNumber function

     unSelectNumber = (clickedNumber)=>{
        this.setState(prevState=>({
            selectedNumbers:prevState.selectedNumbers.filter(number=>number!=clickedNumber)
        }));//end:setState
     }//end:unSelectNumber function


     render(){
         //In order to use the state properties as local variables in the render function, create an anonymous constant object
         const {selectedNumbers, numberOfStars} = this.state;
      return (
          <div className="row">
              <Stars numberOfStars={numberOfStars}/>
              <Buttons selectedNumbers = {selectedNumbers}/>
              <Answers selectedNumbers = {selectedNumbers}
              unSelectNumber = {this.unSelectNumber}              
              />
              <Numbers
              selectedNumbers = {selectedNumbers}
              selectNumber ={this.selectNumber}
              />
          </div>
      );
     }//end:render
 }//end:Game class-component

 const Stars = (props)=>{
     //Create a dynamic number of stars     
     let stars = [];
     for(let i =0; i<props.numberOfStars;i++){
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
          <button className="btn equalButton" disabled={props.selectedNumbers.length===0}>=</button>
      </div>
  );
 };//end:Buttons function-component

 const Answers = (props)=>{
   return(
       <div className="col-lg-5">
            <div>
                {props.selectedNumbers.map((number,i)=><span key={i} onClick={()=>props.unSelectNumber(number)}>{number}</span>)}
            </div>
       </div>
   );
 };//end:Answers function-component

 const Numbers = (props)=>{

     const numberClass = (num) => {
         if(props.selectedNumbers.indexOf(num) >= 0) {
            return 'selected';
         }
     }//end:numberClass

    return(
        <div className="col-lg-12 numbers-area text-center">
            <div>
                {
                    Numbers.list.map((number,i)=>
                    <span key={i} className={numberClass(number)}
                    onClick={()=>props.selectNumber(number)}
                    >{number}</span>
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