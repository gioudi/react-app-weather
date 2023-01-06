import Suggestions from './Suggestions'
import { ChangeEvent } from 'react'
import { optionType } from '../types/index'
type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Header = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props): JSX.Element => (
  <div className=' md:flex w-screen p-4 bg-zinc-900  md:justify-between shadow-md items-center  mb-10 md:mb-4 '>
    <div className='flex md:inline-flex items-center justify-center md:justify-start'>
      <h1 className='text-3xl text-zinc-50 font-semibold mb-10 md:mb-0'>Weather forecast</h1>
    </div>

    <div className='relative flex md:inline-flex items-center justify-between h-10 w-auto lg:w-[400px] bg-zinc-50 rounded-lg px-3'>
      <input
        type='Search'
        name='city'
        value={term}
        onChange={onInputChange}
        placeholder='Search'
        className='mr-3 h-8 outline-none '
      />
      <button
        className='px-2 py-1 cursor-pointer w-auto lg:w-20 hover:text-zinc-500 text-zinc-600'
        onClick={onSubmit}
      >
        search
      </button>
      <Suggestions options={options} onSelect={onOptionSelect} />
    </div>
  </div>
)
export default Header
