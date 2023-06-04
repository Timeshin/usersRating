import { IUser } from '../stores/usersStore.types'

export type IUserFromApi = Omit<IUser, 'rating'>

export type IFetchUsersResponse = IUserFromApi[]

export type IFetchNextUsersPageResponse = IUserFromApi[]
