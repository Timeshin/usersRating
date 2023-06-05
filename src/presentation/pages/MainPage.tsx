import { NeutralUsersColumn, RatedUsersColumn } from '@/components'
import { MainLayout } from '@/layouts'

const MainPage = () => (
	<MainLayout>
		<NeutralUsersColumn />
		<RatedUsersColumn />
	</MainLayout>
)

export default MainPage
