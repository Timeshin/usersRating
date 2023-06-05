import { FC } from 'react'
import { User } from '@/domain/entities/User'

import { Avatar, Box, Button, Rating, styled, Typography } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

interface IUserItem {
	user: User
	decrementRating: (uid: Uid) => void
	incrementRating: (uid: Uid) => void
	removeUser?: (uid: Uid) => void
	isPossiblyToIncrementRating: boolean
	isPossiblyToDecrementRating: boolean
	showDeleteUserButton: boolean
}

const UserContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const UserItem: FC<IUserItem> = ({
	user: { avatar, email, first_name, uid, rating, username },
	decrementRating,
	incrementRating,
	removeUser,
	isPossiblyToDecrementRating,
	isPossiblyToIncrementRating,
	showDeleteUserButton
}) => (
	<UserContainer>
		<Avatar sx={{ width: 56, height: 56 }} alt={username} src={avatar} />
		<Box flex={1}>
			<Typography variant='h6'>{first_name}</Typography>
			<Typography variant='body1'>Username: {username}</Typography>
			<Typography variant='body2'>Email: {email}</Typography>
			<Box display='flex' alignItems='center'>
				<Rating name='read-only' value={rating} readOnly />
				<Typography variant='body2'>({rating})</Typography>
			</Box>
		</Box>
		<Box sx={{ display: 'flex', gap: '10px' }}>
			<Button
				variant='contained'
				color='primary'
				onClick={() => incrementRating(uid)}
				disabled={!isPossiblyToIncrementRating}
			>
				<ArrowDropUp />
			</Button>
			<Button
				variant='contained'
				color='primary'
				onClick={() => decrementRating(uid)}
				disabled={!isPossiblyToDecrementRating}
			>
				<ArrowDropDown />
			</Button>
			{showDeleteUserButton && (
				<Button variant='outlined' color='error' onClick={() => removeUser(uid)}>
					<DeleteOutlineIcon />
				</Button>
			)}
		</Box>
	</UserContainer>
)

export default UserItem
