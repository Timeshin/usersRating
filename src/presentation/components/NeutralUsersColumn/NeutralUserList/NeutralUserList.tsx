import { FC } from 'react'
import { User } from '@/domain/entities/User'

import { Grid, styled, Typography } from '@mui/material'
import NeutralUserItem from './NeutralUserItem/NeutralUserItem'

interface INeutralUserList {
	users: User[]
}

const UserListContainer = styled(Grid)`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 15px;
`

const NeutralUserList: FC<INeutralUserList> = ({ users }) => {
	if (!users.length) {
		return <Typography variant='h3'>No users</Typography>
	}

	return (
		<UserListContainer>
			{users.map((user) => (
				<NeutralUserItem key={user.id} user={user} />
			))}
		</UserListContainer>
	)
}

export default NeutralUserList
