import { AxiosInstance } from 'axios'
import fetchInstance, { defaultApiParams } from '@/config/fetchInstance.config'

// Default APIs configuration
export class BaseApi {
	protected readonly api: AxiosInstance
	protected readonly defaultParams: typeof defaultApiParams

	constructor() {
		this.api = fetchInstance
		this.defaultParams = defaultApiParams
	}
}
