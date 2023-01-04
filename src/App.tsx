import React from 'react'

import './App.css'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('name')}
        </a>
      </header>
    </div>
  )
}

export default App

