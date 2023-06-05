import { INegativeUsersActions, INegativeUsersState } from '@/types/domain/stores/negativeUsersStore.types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'
import { User } from '@/domain/entities/User'
import { useUsersStore } from './users.store'

const useNegativeUsersStore = create<INegativeUsersState & INegativeUsersActions>()(
	persist(
		immer((set) => ({
			negativeUsers: [],
			initializeUsers: (usersData) =>
				set((state: INegativeUsersState) => {
					state.negativeUsers = usersData.map((user) => new User(user))
				}),
			addUser: (user) =>
				set((state: INegativeUsersState) => {
					state.negativeUsers.push(user)
				}),
			removeUser: (userUid) =>
				set((state: INegativeUsersState) => {
					const user = state.negativeUsers.find(({ uid }) => uid === userUid)

					state.negativeUsers = state.negativeUsers.filter(({ uid }) => uid !== userUid)

					useUsersStore.getState().addUser(user)
				}),
			incrementRating: (userUid) =>
				set((state: INegativeUsersState) => {
					const user = state.negativeUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()

						state.negativeUsers = state.negativeUsers.map((stateUser) => {
							if (stateUser.uid === user.uid) {
								return user
							}

							return stateUser
						})
					}
				}),
			decrementRating: (userUid) =>
				set((state: INegativeUsersState) => {
					const user = state.negativeUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()

						state.negativeUsers = state.negativeUsers.map((stateUser) => {
							if (stateUser.uid === user.uid) {
								return user
							}

							return stateUser
						})
					}
				})
		})),
		{
			name: 'negativeUsersStore',
			onRehydrateStorage: () => (state) => {
				state.initializeUsers(state.negativeUsers)
			}
		}
	)
)

export { useNegativeUsersStore }
