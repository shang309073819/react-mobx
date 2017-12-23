import React from 'react';
import cl from 'classnames';
import {observer} from 'mobx-react'
import styles from './Popup.scss';
import popupStore from '../../stores/PopupStore';

@observer
export default class Popup extends React.Component {
	render() {
		return (
			<div className={cl(styles.container, {[styles.active]: popupStore.show})}>
				<div className={styles.overlay} onClick={() => {
					popupStore.changePopup(false)
				}}/>
				<div className={styles.modal}>
					<div className={styles.text}>
						MobX is a battle tested library that makes state management simple and scalable
						by transparently applying functional reactive programming (TFRP). The philosophy behind MobX is
					</div>
					<div className={styles.closeBtn} onClick={() => {
						popupStore.changePopup(false)
					}}>close
					</div>
				</div>
			</div>
		)
	}
}
