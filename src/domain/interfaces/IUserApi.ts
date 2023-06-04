import { IFetchNextUsersPageResponse, IFetchUsersResponse } from '@/types/domain/interfaces/IUserApi.types'

export interface IUserApi {
	fetchUsers(): Promise<IFetchUsersResponse>
	fetchNextUsersPage(page: number): Promise<IFetchNextUsersPageResponse>
}
