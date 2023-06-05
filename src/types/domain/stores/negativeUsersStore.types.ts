import { User } from '@/domain/entities/User'
import { IUser } from './usersStore.types'

export interface INegativeUsersState {
	negativeUsers: User[]
}

export interface INegativeUsersActions {
	initializeUsers: (usersData: IUser[]) => void
	addUser: (users: User) => void
	removeUser: (userUid: string) => void
	incrementRating: (userUid: string) => void
	decrementRating: (userUid: string) => void
}
