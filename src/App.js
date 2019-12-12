import React,{ Component } from 'react';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox';
// import { robots } from './Robots';
import Scroll from './Scroll';
import './App.css'

class App extends Component{
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		};
	}

	componentDidMount(){
		// console.log("Done");
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
			return response.json();
		}).then(users=>{
			this.setState({robots: users});
		});
		// this.setState({robots: robots});
	}

	onSearchChange = (event)=>{
		// this.state.searchfield = event.target.value;
		this.setState({searchfield:event.target.value});
	};


	render(){
		const filteredRobots = this.state.robots.filter(robots=>{
			return robots.name.toLowerCase().includes(this.state.searchfield);
		})
		if(this.state.robots.length ===0){
			return <h1 className='tc'>Loading...</h1>
		}
		else
		{
			return(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={this.onSearchChange} />
				<Scroll>
					<Cardlist robots={ filteredRobots } />
				</Scroll>
			</div>
			);
		}
	};
}
export default App;