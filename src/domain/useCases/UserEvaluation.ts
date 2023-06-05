import { useModalStore } from '@/stores/modals.store'
import { IUserEntity } from '@/types/domain/entities/User.types'

export class UserEvaluation {
	private user: IUserEntity

	constructor(user: IUserEntity) {
		this.user = user
	}

	incrementRating() {
		this.user.incrementRating()
		this.checkIsUserReachedLimit()
	}

	decrementRating() {
		this.user.decrementRating()
		this.checkIsUserReachedLimit()
	}

	private checkIsUserReachedLimit() {
		if (this.user.rating === 5) {
			useModalStore.getState().openModal('positive', this.user)
		}

		if (this.user.rating === -5) {
			useModalStore.getState().openModal('negative', this.user)
		}
	}
}
