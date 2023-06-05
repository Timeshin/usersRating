import { User } from '@/domain/entities/User'

export interface IModalState {
	isModalOpen: boolean
	user: User | null
	type: 'negative' | 'positive'
}

export interface IModalActions {
	openModal: (type: IModalState['type'], user: IModalState['user']) => void
	closeModal: () => void
}
