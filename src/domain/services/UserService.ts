import { UserApi } from '@/adapters/UserApi'
import { User } from '@/domain/entities/User'

export class UserService {
	private userApi: UserApi

	constructor(userApi: UserApi) {
		this.userApi = userApi
	}

	async getUsers() {
		const usersResponse = await this.userApi.fetchUsers()

		return usersResponse.map((user) => new User(user))
	}

	async getNextUsersPage(page: number) {
		const usersResponse = await this.userApi.fetchNextUsersPage(page)

		return usersResponse.map((user) => new User(user))
	}
}
