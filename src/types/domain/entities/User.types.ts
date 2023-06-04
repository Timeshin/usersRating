import { IUser } from '@/types/domain/stores/usersStore.types'

export interface IUserEntity extends IUser {
	incrementRating: () => void
	decrementRating: () => void
}
