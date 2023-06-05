import { IModalState, IModalActions } from '@/types/domain/stores/modalsStore.types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useModalStore = create<IModalState & IModalActions>()(
	immer((set) => ({
		isModalOpen: false,
		user: null,
		type: 'positive',
		closeModal: () =>
			set((state: IModalState) => {
				state.isModalOpen = false
			}),
		openModal: (type, user) =>
			set((state: IModalState) => {
				state.isModalOpen = true
				state.type = type
				state.user = user
			})
	}))
)

export { useModalStore }

useModalStore.subscribe((state) => console.log(state, 'modal store action'))
