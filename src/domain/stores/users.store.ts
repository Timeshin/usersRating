import { IUsersActions, IUsersState } from '@/types/domain/stores/usersStore.types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { UserService } from '@/domain/services/UserService'
import { UserApi } from '@/adapters/UserApi'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'

const userService = new UserService(new UserApi())

const useUsersStore = create<IUsersState & IUsersActions>()(
	persist(
		immer((set, get) => ({
			users: [],
			setUsers: (users) =>
				set((state: IUsersState) => {
					state.users = users
				}),
			addUsers: (users) =>
				set((state: IUsersState) => {
					state.users.push(users)
				}),
			removeUser: (userUid) =>
				set((state: IUsersState) => {
					state.users = state.users.filter(({ uid }) => uid === userUid)
				}),
			incrementRating: (userUid) =>
				set((state: IUsersState) => {
					const user = state.users.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()
					}
				}),
			decrementRating: (userUid) =>
				set((state: IUsersState) => {
					const user = state.users.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()
					}
				}),
			getUsers: async () => {
				const usersResponse = await userService.getUsers()

				get().setUsers(usersResponse)
			}
		})),
		{ name: 'usersStore' }
	)
)

export { useUsersStore }
