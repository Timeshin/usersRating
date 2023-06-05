import { UserList } from '@/components'
import { usePositiveUsersStore } from '@/stores/positiveUsers.store'

const PositiveUsersTab = () => {
	const users = usePositiveUsersStore(({ positiveUsers }) => positiveUsers)
	const incrementRating = usePositiveUsersStore(({ incrementRating }) => incrementRating)
	const decrementRating = usePositiveUsersStore(({ decrementRating }) => decrementRating)
	const removeUser = usePositiveUsersStore(({ removeUser }) => removeUser)

	return (
		<UserList
			users={users}
			incrementRating={incrementRating}
			decrementRating={decrementRating}
			removeUser={removeUser}
			listType='positive'
		/>
	)
}

export default PositiveUsersTab
