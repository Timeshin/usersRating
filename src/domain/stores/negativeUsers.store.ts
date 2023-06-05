import { INegativeUsersActions, INegativeUsersState } from '@/types/domain/stores/negativeUsersStore.types'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware/persist'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'

const useNegativeUsersStore = create<INegativeUsersState & INegativeUsersActions>()(
	persist(
		immer((set) => ({
			negativeUsers: [],
			addUser: (user) =>
				set((state: INegativeUsersState) => {
					state.negativeUsers.push(user)
				}),
			removeUser: (userUid) =>
				set((state: INegativeUsersState) => {
					state.negativeUsers = state.negativeUsers.filter(({ uid }) => uid !== userUid)
				}),
			incrementRating: (userUid) =>
				set((state: INegativeUsersState) => {
					const user = state.negativeUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()
					}
				}),
			decrementRating: (userUid) =>
				set((state: INegativeUsersState) => {
					const user = state.negativeUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()
					}
				})
		})),
		{ name: 'negativeUsersStore' }
	)
)

export { useNegativeUsersStore }
