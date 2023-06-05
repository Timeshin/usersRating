import { useEffect } from 'react'
import { useUsersStore } from '@/stores/users.store'

import { ColumnWrapper } from '@/components'
import { Typography } from '@mui/material'
import NeutralUserList from './NeutralUserList/NeutralUserList'

const NeutralUsersColumn = () => {
	const users = useUsersStore(({ users }) => users)
	const getUsers = useUsersStore(({ getUsers }) => getUsers)

	useEffect(() => {
		getUsers()
	}, [getUsers])

	return (
		<ColumnWrapper>
			<Typography variant='h6' gutterBottom>
				Neutral users
			</Typography>
			<NeutralUserList users={users} />
		</ColumnWrapper>
	)
}

export default NeutralUsersColumn
