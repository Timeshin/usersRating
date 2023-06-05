import { UserList } from '@/components'
import { useNegativeUsersStore } from '@/stores/negativeUsers.store'

const NegativeUsersTab = () => {
	const users = useNegativeUsersStore(({ negativeUsers }) => negativeUsers)
	const incrementRating = useNegativeUsersStore(({ incrementRating }) => incrementRating)
	const decrementRating = useNegativeUsersStore(({ decrementRating }) => decrementRating)
	const removeUser = useNegativeUsersStore(({ removeUser }) => removeUser)

	return (
		<UserList
			users={users}
			incrementRating={incrementRating}
			decrementRating={decrementRating}
			removeUser={removeUser}
			listType='negative'
		/>
	)
}

export default NegativeUsersTab
