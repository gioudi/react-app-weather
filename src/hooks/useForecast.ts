import { useState, ChangeEvent, useEffect } from 'react';
import { forecastType, optionType } from '../types';
const useForecast = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<forecastType | null>(null);

    const getSearchOptions = (value: string) => {
        fetch(`
        http://api.openweathermap.org/geo/1.0/direct/
        q=${value.trim()}
        &limit=5
        &appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => setOptions(data))
            .catch(e => e);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setTerm(value);
        if (value === '') return;

        getSearchOptions(value);
    };

    const onOptionSelect = (payload: optionType) => {
        setCity(payload);
    };

    const onSubmit = () => {
        if (!city) return;

        getForecast(city);
    };

    const getForecast = (city: optionType) => {
        fetch(`
        https://api.openweathermap.org/data/2.5/weather?
        lat=${city.lat}
        &lon=${city.lon}
        &appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const forecastData = {
                    ...data.city,
                    list: data.list.slice(0, 16),
                };
                setForecast(forecastData);
            })
            .catch(e => e);
    };

    useEffect(() => {
        if (city) {
            setTerm(city.name);
            setOptions([]);
        }
    }, [city]);

    return {
        options,
        forecast,
        city,
        term,
        onInputChange,
        onOptionSelect,
        onSubmit,
    };
};

export default useForecast;
