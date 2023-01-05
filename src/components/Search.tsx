import { ChangeEvent } from 'react'
import { optionType } from '../types/index'
import Suggestions from './Suggestions'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props): JSX.Element => {
  return (
    <main className='flex justify-center'>
      <section
        className='md:max-w-[500px] p-4 flex-col justify-center
                md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20
                backdrop-blur-lg rounded drop-shadow-lg  text-zinc-700'
      >
        <h1 className='text-4x1 font-thin mb-2'>
          Weather <span className='font-black'> Forecast</span>
        </h1>
        <p className='text-sm '>
          Enter below a place you want to know the weather of and select an option from the dropdown
        </p>

        <div className='relative flex mt-10 md:mt-4 '>
          <input
            type='text'
            name='city'
            id=''
            value={term}
            onChange={onInputChange}
            className='px-2 py-1 rounded-1-md border-2 border-white'
          />

          <Suggestions options={options} onSelect={onOptionSelect} />
          <button
            className='rounded-r-md
                            px-2 py-1 cursor-pointer
                            border-2 border-zinc-100
                        hover:border-zinc-500 hover:text-zinc-500
                            text-zinc-100'
            onClick={onSubmit}
          >
            search
          </button>
        </div>
      </section>
    </main>
  )
}

export default Search
