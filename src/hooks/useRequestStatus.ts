import { useCallback, useState } from 'react'

type UseRequestStatus = <T>(
	promiseCB: () => Promise<T>
) => [() => Promise<void>, { isLoading: boolean; isError: boolean }]

const useRequestStatus: UseRequestStatus = (promiseCB) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const request = useCallback(async () => {
		setIsLoading(true)

		try {
			await promiseCB()

			setIsError(false)
		} catch (error) {
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}, [promiseCB])

	return [request, { isLoading, isError }]
}

export { useRequestStatus }
