import { User } from '@/domain/entities/User'

export interface IPositiveUsersState {
	positiveUsers: User[]
}

export interface IPositiveUsersActions {
	addUser: (users: User) => void
	removeUser: (userUid: string) => void
	incrementRating: (userUid: string) => void
	decrementRating: (userUid: string) => void
}
