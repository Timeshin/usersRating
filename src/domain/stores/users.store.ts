import { IUsersActions, IUsersState } from '@/types/domain/stores/usersStore.types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { UserService } from '@/domain/services/UserService'
import { UserApi } from '@/adapters/UserApi'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'
import { User } from '@/domain/entities/User'
import { useNegativeUsersStore } from './negativeUsers.store'
import { usePositiveUsersStore } from './positiveUsers.store'

const userService = new UserService(new UserApi())

const useUsersStore = create<IUsersState & IUsersActions>()(
	persist(
		immer((set, get) => ({
			users: [],
			page: 1,
			initializeUsers: (usersData) =>
				set((state: IUsersState) => {
					state.users = usersData.map((user) => new User(user))
				}),
			setUsers: (users) =>
				set((state: IUsersState) => {
					state.users = users
				}),
			setPage: (page) =>
				set((state: IUsersState) => {
					state.page = page
				}),
			addUsers: (users) =>
				set((state: IUsersState) => {
					state.users.push(...users)
				}),
			addUser: (user) =>
				set((state: IUsersState) => {
					state.users.push(user)
				}),
			incrementRating: (userUid) =>
				set((state: IUsersState) => {
					const user = state.users.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()

						usePositiveUsersStore.getState().addUser(user)
						state.users = state.users.filter(({ uid }) => uid !== userUid)
					}
				}),
			decrementRating: (userUid) =>
				set((state: IUsersState) => {
					const user = state.users.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()

						useNegativeUsersStore.getState().addUser(user)
						state.users = state.users.filter(({ uid }) => uid !== userUid)
					}
				}),
			getUsers: async () => {
				const usersResponse = await userService.getUsers()

				get().setUsers(usersResponse)
				get().setPage(1)
			},
			getNextPageUsers: async (page) => {
				const usersResponse = await userService.getNextUsersPage(page)

				get().setPage(page)
				get().addUsers(usersResponse)
			}
		})),
		{
			name: 'usersStore',
			onRehydrateStorage: () => (state) => {
				state.initializeUsers(state.users)
			}
		}
	)
)

export { useUsersStore }
