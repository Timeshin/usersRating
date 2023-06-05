import { User } from '@/domain/entities/User'

export interface INegativeUsersState {
	negativeUsers: User[]
}

export interface INegativeUsersActions {
	addUser: (users: User) => void
	removeUser: (userUid: string) => void
	incrementRating: (userUid: string) => void
	decrementRating: (userUid: string) => void
}
