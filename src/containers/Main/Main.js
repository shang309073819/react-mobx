import React from 'react';
import {observer} from 'mobx-react'
import Popup from '../../components/Popup/Popup';
import popupStore from '../../stores/PopupStore';

import styles from './Main.scss';

@observer
export default class Main extends React.Component {
	openPopup = () => {
		popupStore.changePopup(true);
	};

	closePopup = () => {
		popupStore.changePopup(false);
	};

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.openPopup} onClick={this.openPopup}>
					README
				</div>
				<Popup show={popupStore.show} close={this.closePopup}/>
			</div>
		)
	}
}
