import { IUserEntity } from '@/types/domain/entities/User.types'

export class UserEvaluation {
	private user: IUserEntity

	constructor(user: IUserEntity) {
		this.user = user
	}

	incrementRating() {
		this.user.incrementRating()
	}

	decrementRating() {
		this.user.decrementRating()
	}
}
