import { useEffect } from 'react'
import { useUsersStore } from '@/stores/users.store'
import { useRequestStatus } from '@/hooks'

import { ColumnWrapper } from '@/components'
import { Box, Button, Typography } from '@mui/material'
import { Refresh, AddBox } from '@mui/icons-material'
import { UserList } from '@/components'

const NeutralUsersColumn = () => {
	const users = useUsersStore(({ users }) => users)
	const page = useUsersStore(({ page }) => page)
	const getUsers = useUsersStore(({ getUsers }) => getUsers)
	const getNextPageUsers = useUsersStore(({ getNextPageUsers }) => getNextPageUsers)
	const incrementRating = useUsersStore(({ incrementRating }) => incrementRating)
	const decrementRating = useUsersStore(({ decrementRating }) => decrementRating)
	const [getUsersRequest, { isLoading: isUsersLoading }] = useRequestStatus(getUsers)
	const [getNextPageUsersRequest, { isLoading: isNextPageDataLoading }] = useRequestStatus(() =>
		getNextPageUsers(page + 1)
	)
	const isUsersLimitReached = users.length >= 50

	const onLoadMoreUsersHandler = () => {
		getNextPageUsersRequest()
	}

	const onRefreshUsersListHandler = () => {
		getUsersRequest()
	}

	useEffect(() => {
		if (users.length) return

		getUsersRequest()
	}, [getUsersRequest, users])

	return (
		<ColumnWrapper>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
				<Typography variant='h6' gutterBottom>
					Neutral users
				</Typography>
				<Button
					variant='contained'
					color='primary'
					startIcon={<Refresh />}
					onClick={onRefreshUsersListHandler}
					sx={{ pointerEvents: isUsersLoading ? 'none' : 'auto', opacity: isUsersLoading ? 0.6 : 1 }}
				>
					Refresh
				</Button>
			</Box>
			{!isUsersLoading && (
				<UserList
					users={users}
					incrementRating={incrementRating}
					decrementRating={decrementRating}
					listType='neutral'
				/>
			)}
			{!isUsersLimitReached && (
				<Box sx={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
					<Button
						variant='contained'
						color='primary'
						endIcon={<AddBox />}
						sx={{ pointerEvents: isNextPageDataLoading ? 'none' : 'auto', opacity: isNextPageDataLoading ? 0.6 : 1 }}
						onClick={onLoadMoreUsersHandler}
					>
						Load More
					</Button>
					<Typography variant='body1'>page ({page})</Typography>
				</Box>
			)}
		</ColumnWrapper>
	)
}

export default NeutralUsersColumn
