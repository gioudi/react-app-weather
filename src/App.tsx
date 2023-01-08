import BlockingNotification from './components/BlockingNotification'
import Forecast from './components/Forecast'
import Header from './components/Header'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { term, loading, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  return (
    <main className='h-screen bg-zinc-50  w-full'>
      <Header
        term={term}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
      />
      {forecast ? <Forecast payload={forecast} /> : <BlockingNotification loading={loading} />}
    </main>
  )
}

export default App
