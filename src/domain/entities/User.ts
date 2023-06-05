import { IUserEntity } from '@/types/domain/entities/User.types'
import { IUserFromApi } from '@/types/domain/interfaces/IUserApi.types'

export class User implements IUserEntity {
	readonly id: Id
	readonly uid: Uid
	readonly email: Email
	readonly first_name: string
	readonly last_name: string
	readonly username: string
	readonly avatar: AvatarUrl
	rating: number

	constructor(user: IUserFromApi) {
		const { id, uid, email, first_name, last_name, username, avatar } = user
		this.id = id
		this.uid = uid
		this.email = email
		this.first_name = first_name
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
