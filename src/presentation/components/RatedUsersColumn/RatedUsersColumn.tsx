import { SyntheticEvent, useMemo, useState } from 'react'
import { usePositiveUsersStore } from '@/stores/positiveUsers.store'
import { useNegativeUsersStore } from '@/stores/negativeUsers.store'

import { Tab, Tabs } from '@mui/material'
import { ColumnWrapper } from '@/components'
import NegativeUsersTab from './NegativeUsersTab/NegativeUsersTab'
import PositiveUsersTab from './PositiveUsersTab/PositiveUsersTab'

enum ContentTabs {
	PositiveTab,
	NegativeTab
}

const RatedUsersColumn = () => {
	const [activeTab, setActiveTab] = useState<ContentTabs>(null)
	const positiveUsers = usePositiveUsersStore(({ positiveUsers }) => positiveUsers)
	const negativeUsers = useNegativeUsersStore(({ negativeUsers }) => negativeUsers)

	const onChangeTabHandler = (_: SyntheticEvent, value: ContentTabs) => {
		setActiveTab(value)
	}

	const activeTabContent = useMemo(() => {
		switch (activeTab) {
			case ContentTabs.PositiveTab:
				return <PositiveUsersTab />
			case ContentTabs.NegativeTab:
				return <NegativeUsersTab />
			default:
				return <></>
		}
	}, [activeTab])

	return (
		<ColumnWrapper>
			<Tabs value={activeTab ?? false} onChange={onChangeTabHandler}>
				<Tab sx={{ flex: 1 }} label='Negative users' value={ContentTabs.NegativeTab} disabled={!negativeUsers.length} />
				<Tab sx={{ flex: 1 }} label='Positive users' value={ContentTabs.PositiveTab} disabled={!positiveUsers.length} />
			</Tabs>
			{activeTabContent}
		</ColumnWrapper>
	)
}

export default RatedUsersColumn
