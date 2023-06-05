import { FC, ReactNode } from 'react'

import { Grid, Paper } from '@mui/material'

interface IColumnWrapper {
	children: ReactNode
}

const ColumnWrapper: FC<IColumnWrapper> = ({ children }) => (
	<Grid container justifyContent='center'>
		<Grid item xs={12} sm={6}>
			<Paper elevation={2} sx={{ p: 2, height: '70vh', overflow: 'auto' }}>
				{children}
			</Paper>
		</Grid>
	</Grid>
)

export default ColumnWrapper
