import { User } from '@/domain/entities/User'

export interface IUser {
	id: Id
	uid: Uid
	email: Email
	firstName: string
	last_name: string
	username: string
	avatar: AvatarUrl
	rating: number
}

export interface IUsersState {
	users: User[]
}

export interface IUsersActions {
	setUsers: (users: User[]) => void
	addUsers: (users: User) => void
	removeUser: (userUid: string) => void
	incrementRating: (userUid: string) => void
	decrementRating: (userUid: string) => void
	getUsers: () => Promise<void>
}
