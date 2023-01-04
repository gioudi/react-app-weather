import { useTranslation } from 'react-i18next'

import Forecast from './components/Forecast'
import Search from './components/Search'
import useForecast from './hooks/useForecast'
const App = (): JSX.Element => {
  const { t, i18n } = useTranslation()

  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } = useForecast()
  return (
    <main className='flex justify-center items-center w-full'>
      {forecast ? (
        <Forecast payload={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
      <p>{t('name')}</p>
    </main>
  )
}

export default App
