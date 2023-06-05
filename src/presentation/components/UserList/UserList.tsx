import { FC } from 'react'
import { User } from '@/domain/entities/User'

import { Grid, styled, Typography } from '@mui/material'
import UserItem from './UserItem/UserItem'

interface IUserList {
	users: User[]
	decrementRating: (uid: Uid) => void
	incrementRating: (uid: Uid) => void
	removeUser?: (uid: Uid) => void
	listType: 'negative' | 'positive' | 'neutral'
}

const UserListContainer = styled(Grid)`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 10px;
`

const UserList: FC<IUserList> = ({ users, decrementRating, incrementRating, removeUser, listType }) => {
	if (!users.length) {
		return <Typography variant='h3'>No users</Typography>
	}

	return (
		<UserListContainer>
			{users.map((user) => (
				<UserItem
					key={user.id}
					user={user}
					incrementRating={incrementRating}
					decrementRating={decrementRating}
					removeUser={removeUser}
					isPossiblyToDecrementRating={
						(listType === 'negative' && user.rating !== -5) ||
						(listType === 'positive' && user.rating !== 0) ||
						listType === 'neutral'
					}
					isPossiblyToIncrementRating={
						(listType === 'positive' && user.rating !== 5) ||
						(listType === 'negative' && user.rating !== 0) ||
						listType === 'neutral'
					}
					showDeleteUserButton={listType !== 'neutral' && user.rating === 0}
				/>
			))}
		</UserListContainer>
	)
}

export default UserList
