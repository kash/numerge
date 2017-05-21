import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// LAYOUT
import App from './components/layout/App.js';
import NotFound from './components/layout/NotFound';

// HOME
import Home from './components/home/Home';
import About from './components/layout/About.js';

import {Provider} from 'react-redux';
import reducers from './reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// LOGIN
import Login from './components/login/Login';
import Join from './components/login/Join';

// NOTES
import Notes from './components/notes/AllNotes';
import NewNote from './components/notes/NewNote';
import NotesLayout from './components/notes/NotesLayout';
import Settings from './components/notes/Settings';

// SEARCH
import Search from './components/search/Search';

const middleware = applyMiddleware(promise(), thunk);
const store = createStore(reducers, middleware);

require('./styles/style.scss');

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
			<Route path="/" component={App} appClassName="home-wrapper">
				<IndexRoute component={Home}/>
			</Route>
			<Route path="/about" component={App} appClassName="about-wrapper">
				<IndexRoute component={About}/>
			</Route>
			<Route path="/login" component={App} appClassName="login-wrapper" hideNav="true" hideFooter="true">
				<IndexRoute component={Login}/>
			</Route>
			<Route path="/join" component={App} appClassName="login-wrapper" hideNav="true" hideFooter="true">
				<IndexRoute component={Join}/>
			</Route>
			<Route path="/search" component={App} appClassName="search-wrapper" whiteNav="true">
				<IndexRoute component={Search}/>
			</Route>
			<Route path="/notes" component={NotesLayout} appClassName="notes-wrapper">
				<IndexRoute component={Notes}/>
				<Route path="/notes/new" component={NewNote}/>
				<Route path="/notes/settings" component={Settings}/>
			</Route>
			<Route path="*" component={App} hideFooter="true">
				<IndexRoute component={NotFound}/>
			</Route>
		</Router>
	</Provider>, document.getElementById('app')
);
