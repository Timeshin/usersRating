export enum Tabs {
	PositiveTab,
	NegativeTab
}

export interface IPositiveUsersState {
	activeTab: Tabs
}

export interface IPositiveUsersActions {
	changeTab: (tab: Tabs) => void
}
