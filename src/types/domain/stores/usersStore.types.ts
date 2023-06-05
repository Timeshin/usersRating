import { User } from '@/domain/entities/User'

export interface IUser {
	id: Id
	uid: Uid
	email: Email
	first_name: string
	last_name: string
	username: string
	avatar: AvatarUrl
	rating: number
}

export interface IUsersState {
	users: User[]
	page: number
}

export interface IUsersActions {
	initializeUsers: (usersData: IUser[]) => void
	setUsers: (users: User[]) => void
	setPage: (page: number) => void
	addUsers: (users: User[]) => void
	addUser: (users: User) => void
	incrementRating: (userUid: string) => void
	decrementRating: (userUid: string) => void
	getUsers: () => Promise<void>
	getNextPageUsers: (page: number) => Promise<void>
}
