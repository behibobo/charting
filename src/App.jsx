import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chart from './Chart';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/chart/:from/:to" exact>
					<Chart />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
