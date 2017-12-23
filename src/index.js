import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './base/index.scss';
import './base/fonts.scss';
import './base/reset.scss';

import App from './containers/App/App';

const container = document.getElementById('app');

if (container) {
	render((
		<div>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</div>
	), container);
}
