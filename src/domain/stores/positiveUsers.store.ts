import { IPositiveUsersActions, IPositiveUsersState } from '@/types/domain/stores/positiveUsersStore.types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'
import { User } from '@/domain/entities/User'
import { useUsersStore } from './users.store'

const usePositiveUsersStore = create<IPositiveUsersState & IPositiveUsersActions>()(
	persist(
		immer((set) => ({
			positiveUsers: [],
			initializeUsers: (usersData) =>
				set((state: IPositiveUsersState) => {
					state.positiveUsers = usersData.map((user) => new User(user))
				}),
			addUser: (user) =>
				set((state: IPositiveUsersState) => {
					state.positiveUsers.push(user)
				}),
			removeUser: (userUid) =>
				set((state: IPositiveUsersState) => {
					const user = state.positiveUsers.find(({ uid }) => uid === userUid)

					state.positiveUsers = state.positiveUsers.filter(({ uid }) => uid !== userUid)

					useUsersStore.getState().addUser(user)
				}),
			incrementRating: (userUid) =>
				set((state: IPositiveUsersState) => {
					const user = state.positiveUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()

						state.positiveUsers = state.positiveUsers.map((stateUser) => {
							if (stateUser.uid === user.uid) {
								return user
							}

							return stateUser
						})
					}
				}),
			decrementRating: (userUid) =>
				set((state: IPositiveUsersState) => {
					const user = state.positiveUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()

						state.positiveUsers = state.positiveUsers.map((stateUser) => {
							if (stateUser.uid === user.uid) {
								return user
							}

							return stateUser
						})
					}
				})
		})),
		{
			name: 'positiveUsersStore',
			onRehydrateStorage: () => (state) => {
				state.initializeUsers(state.positiveUsers)
			}
		}
	)
)

export { usePositiveUsersStore }

usePositiveUsersStore.subscribe((state) => console.log(state, 'positive users store action'))
