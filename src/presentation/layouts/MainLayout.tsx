import { FC, ReactNode } from 'react'

import { Grid } from '@mui/material'
import { VerdictModal } from '@/components'

interface IMainLayout {
	children: ReactNode
}

const MainLayout: FC<IMainLayout> = ({ children }) => (
	<>
		<Grid container justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
			<Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
				{children}
			</Grid>
		</Grid>
		<VerdictModal />
	</>
)

export default MainLayout
