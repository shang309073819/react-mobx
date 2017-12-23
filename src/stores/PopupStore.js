import {observable, action} from 'mobx';

class PopupStore {
	@observable show;

	constructor() {
		this.show = false;
	}

	@action
	changePopup = (state) => {
		this.show = state;
	}
}

export default new PopupStore();
