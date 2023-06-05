import { FC } from 'react'
import { User } from '@/domain/entities/User'
import { Box, Button, Rating, styled, Typography } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

interface INeutralUserItem {
	user: User
}

const UserContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const UserAvatar = styled(Box)`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
`

const NeutralUserItem: FC<INeutralUserItem> = ({ user: { avatar, email, firstName, uid, rating, username } }) => (
	<UserContainer>
		<UserAvatar component='img' src={avatar} alt='Avatar' />
		<Box flex={1}>
			<Typography variant='h6'>{firstName}</Typography>
			<Typography variant='body1'>Username: {username}</Typography>
			<Typography variant='body2'>Email: {email}</Typography>
			<Box display='flex' alignItems='center'>
				<Rating name='read-only' value={rating} readOnly />
				<Typography variant='body2'>({rating})</Typography>
			</Box>
		</Box>
		<Box>
			<Button variant='contained' color='primary' sx={{ marginRight: '10px' }}>
				<ArrowDropUp />
			</Button>
			<Button variant='contained' color='primary'>
				<ArrowDropDown />
			</Button>
		</Box>
	</UserContainer>
)

export default NeutralUserItem
