import axios from 'axios'

export const defaultApiParams = {
	size: 5,
	page: 1
}

const fetchInstance = axios.create({
	baseURL: process.env.VITE_API_URL
})

export default fetchInstance
