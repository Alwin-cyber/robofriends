import React,{Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import {setSearchField} from '../action';
import {connect} from 'react-redux';

  const mapStateToProps = state => {
  	return {
  		searchField: state.searchField
  	}
  }

  const mapDispatchToProps = (dispatch) => {
  return {
  	onSearchChange:(event) => dispatch(setSearchField(event.target.value))
   }
  }

	class App extends Component{
		constructor(){
			super()
			this.state = {
				robots :[]
			}
		}
     
        componentDidMount () {
        	console.log(this.props.store.getState())
           fetch('https://jsonplaceholder.typicode.com/users')
           .then(response =>response.json())
           .then(users => this.setState({robots:users}))
        }  
  
		render(){
	    const {robots} = this.state;
	    const {searchField,onSearchChange} = this.props;
		const filteredRobots = this.state.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase());
			})
		return (
	  	    <div className='tc'>
		  	    <h1>RoboFriends</h1>
		  	    <SearchBox  searchChange={onSearchChange}/>
		  	    <Scroll>
		  	     <CardList robots={filteredRobots}/>
		  	    </Scroll> 
		  	</div>    
  	    );
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);