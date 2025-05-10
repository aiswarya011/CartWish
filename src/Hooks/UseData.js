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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ? deps : []);//when ever url or params changes trigger api call

    return { data, error, isLoading }
}

export default UseData
