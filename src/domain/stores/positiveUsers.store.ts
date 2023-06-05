import { IPositiveUsersActions, IPositiveUsersState } from '@/types/domain/stores/positiveUsersStore.types'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware/persist'
import { UserEvaluation } from '@/domain/useCases/UserEvaluation'

const usePositiveUsersStore = create<IPositiveUsersState & IPositiveUsersActions>()(
	persist(
		immer((set) => ({
			positiveUsers: [],
			addUser: (user) =>
				set((state: IPositiveUsersState) => {
					state.positiveUsers.push(user)
				}),
			removeUser: (userUid) =>
				set((state: IPositiveUsersState) => {
					state.positiveUsers = state.positiveUsers.filter(({ uid }) => uid !== userUid)
				}),
			incrementRating: (userUid) =>
				set((state: IPositiveUsersState) => {
					const user = state.positiveUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.incrementRating()
					}
				}),
			decrementRating: (userUid) =>
				set((state: IPositiveUsersState) => {
					const user = state.positiveUsers.find((user) => user.uid === userUid)

					if (user) {
						const userEvaluation = new UserEvaluation(user)

						userEvaluation.decrementRating()
					}
				})
		})),
		{ name: 'positiveUsersStore' }
	)
)

export { usePositiveUsersStore }
