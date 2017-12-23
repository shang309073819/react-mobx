import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from '../Main/Main';
import Timer from '../Timer/Timer';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Main}/>
				<Route path='/timer' component={Timer}/>
			</Switch>
		)
	}
}
