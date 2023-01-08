import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string | JSX.Element
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]
  return (
    <article
      className='min-w-[140px] max-w-[140px] h-[130px] max-h-[130px] text-zinc-50  flex flex-col justify-between
         bg-zinc-900  shadow-md rounded-lg  p-2 lg:mx-4'
    >
      <div className='flex items-center text-sm font-bold'>
        <Icon /> <h4 className='ml-1'>{title}</h4>
      </div>
      <h3 className='mt-2 text-lg'>{info}</h3>
      <p className='text-xs font-bold text-ellipsis whitespace-nowrap overflow-hidden  w-32 text hover:whitespace-normal'>
        {description}
      </p>
    </article>
  )
}

export default Tile
