import { useEffect, useState } from 'react'
import apiClient from '../utils/api-client';
// custom hook
const UseData = (url, customConfig, deps) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        apiClient
            .get(url, customConfig)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false)
            });
    }, deps ? deps : []);//when ever url or params changes trigger api call

    return { data, error, isLoading }
}

export default UseData
