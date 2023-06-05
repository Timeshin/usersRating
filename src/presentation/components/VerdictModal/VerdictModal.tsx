import { Modal as ModalComponent, Typography, Button, Box, Theme, SxProps } from '@mui/material'
import { useModalStore } from '@/stores/modals.store'
import { usePositiveUsersStore } from '@/stores/positiveUsers.store'
import { useNegativeUsersStore } from '@/stores/negativeUsers.store'

const sxStyles: SxProps<Theme> = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '90%',
	maxWidth: '400px',
	padding: '16px',
	backgroundColor: 'white',
	borderRadius: '8px'
}

const VerdictModal = () => {
	const { closeModal, isModalOpen, type, user } = useModalStore((modalState) => modalState)
	const removePositiveUser = usePositiveUsersStore(({ removeUser }) => removeUser)
	const removeNegativeUser = useNegativeUsersStore(({ removeUser }) => removeUser)
	const modalTitle =
		type === 'positive'
			? `You need to reward ${user?.username}. Do this?`
			: `It is time to ban ${user?.username}. Do this?`
	const onPositiveHandler = () => {
		if (type === 'positive') {
			removePositiveUser(user.uid)
		} else {
			removeNegativeUser(user.uid)
		}

		closeModal()
	}

	return (
		<ModalComponent sx={sxStyles} open={isModalOpen} onClose={closeModal}>
			<Box>
				<Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
					<Typography variant='h5' gutterBottom>
						{modalTitle}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Please confirm your decision.
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
					<Button variant='contained' color='error' onClick={closeModal}>
						Cancel
					</Button>
					<Button variant='contained' color='success' onClick={onPositiveHandler}>
						Confirm
					</Button>
				</Box>
			</Box>
		</ModalComponent>
	)
}

export default VerdictModal
