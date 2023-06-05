import { FC, ReactNode } from 'react'

import { Grid, Paper } from '@mui/material'

interface IColumnWrapper {
	children: ReactNode
}

const ColumnWrapper: FC<IColumnWrapper> = ({ children }) => (
	<Grid container justifyContent='center'>
		<Grid item sm={10}>
			<Paper elevation={2} sx={{ position: 'relative', p: 2, height: '70vh', overflow: 'auto' }}>
				{children}
			</Paper>
		</Grid>
	</Grid>
)

export default ColumnWrapper
