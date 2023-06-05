import { IFetchNextUsersPageResponse, IFetchUsersResponse } from '@/types/domain/interfaces/IUserApi.types'
import { IUserApi } from '../domain/interfaces/IUserApi'
import { BaseApi } from './BaseApi'

// All user APIs
export class UserApi extends BaseApi implements IUserApi {
	async fetchUsers() {
		const { data } = await this.api<IFetchUsersResponse>('users/random_user', {
			params: {
				...this.defaultParams
			}
		})

		return data
	}

	async fetchNextUsersPage(page: number) {
		const { data } = await this.api<IFetchNextUsersPageResponse>('users/random_user', {
			params: {
				...this.defaultParams,
				page: page
			}
		})

		return data
	}
}
