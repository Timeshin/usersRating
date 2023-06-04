import { IUserEntity } from '@/types/domain/entities/User.types'
import { IUserFromApi } from '@/types/domain/interfaces/IUserApi.types'

export class User implements IUserEntity {
	id: Id
	uid: Uid
	email: Email
	firstName: string
	last_name: string
	username: string
	avatar: AvatarUrl
	rating: number

	public constructor(user: IUserFromApi) {
		const { id, uid, email, firstName, last_name, username, avatar } = user
		this.id = id
		this.uid = uid
		this.email = email
		this.firstName = firstName
		this.last_name = last_name
		this.username = username
		this.avatar = avatar
		this.rating = 0
	}

	incrementRating() {
		this.rating += 1
	}

	decrementRating() {
		this.rating -= 1
	}
}
