import apiURL from '../api'
import { useState, ChangeEvent, useEffect } from 'react'
import { forecastType, optionType } from '../types'
const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const apiKey = process.env.REACT_APP_API_KEY

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm('')
    setForecast(null)

    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return

    getSearchOptions(value)
  }

  const getSearchOptions = async (value: string) => {
    try {
      setLoading(true)
      const resp = await apiURL.get(`/geo/1.0/direct?q=${value.trim()}&appid=${apiKey}`)

      if (resp.data.length > 0) {
        setOptions(resp.data)
      }
    } catch (error) {
      throw new Error('Not found data')
    } finally {
      setLoading(false)
    }
  }

  const onOptionSelect = (payload: optionType) => {
    setCity(payload)
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const getForecast = async (city: optionType) => {
    try {
      setLoading(true)

      const resp = await apiURL.get(
        `/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`,
      )
      if (resp.data) {
        const forecastData = {
          ...resp.data.city,
          list: resp.data.list.slice(0, 16),
        }
        setForecast(forecastData)
      }
    } catch (error) {
      throw new Error('Not found data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    options,
    forecast,
    city,
    term,
    onInputChange,
    onOptionSelect,
    onSubmit,
    loading,
  }
}

export default useForecast
