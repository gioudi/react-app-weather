import { isTemplateExpression } from 'typescript'
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../types'
import Degree from './Degree'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'

type Props = {
  payload: forecastType
}

const Forecast = ({ payload }: Props): JSX.Element => {
  const today = payload.list[0]
  return (
    <div
      className=' w-full md:max-w-[500px] py-4 md:py-4
                md:px-10 lg:p-24 h-full lg:h-auto bg-white bg-opacity-20
                backdrop-blur-lg rounded drop-shadow-lg  '
    >
      <div className='mx-auto w-[300px]'>
        <section className='text-center'>
          <h2 className='text-2x1 font-black'>
            {payload.name}, <span className='font-thin'>{payload.country}</span>
          </h2>
          <h1 className='text-4x1 font-extrabold'>
            <Degree temp={Math.round(today.main.temp)} />
            <Degree temp={Math.round(today.main.temp)} />
            <p className='text-sm'>
              {today.weather[0].main} {today.weather[0].description}
            </p>
            <p className='text-sm'>
              H: <Degree temp={Math.ceil(today.main.temp_max)} />
              L: <Degree temp={Math.floor(today.main.temp_min)} />
            </p>
          </h1>
        </section>
        <section className='flex overflow-x-scroll mt-4 pb-2 mb-5'>
          {payload.list.map((item, index) => (
            <div key={index} className='inline-block text-center w-[500px] flex-shrink-0'>
              <p className='text-sm'>{index === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />

              <p className='text-sm font-bold'>
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className='flex flex-wrap justify-between text-zinc-700'>
          <div className=' w-[140px] text-xs font-bold flex flex-col items-center bg-white/20  backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunrise />
            <span>{getSunTime(payload.sunrise)}</span>
          </div>
          <div className=' w-[140px]  text-xs font-bold flex flex-col items-center bg-white/20  backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunset />
            <span>{getSunTime(payload.sunset)}</span>
          </div>

          <Tile
            icon='wind'
            title='Wind'
            info={`${Math.round(today.wind.speed)}  km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg),
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon='feels'
            title='Feels Like'
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'warmer'
            } `}
          />
          <Tile
            icon='humidity'
            title='Humidity'
            info={`${Math.round(today.main.humidity)}  %`}
            description={`${getHumidityValue(today.main.humidity)}`}
          />

          <Tile
            icon='pop'
            title='Precipitation'
            info={`${Math.round(today.pop * 1000)}  %`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />

          <Tile
            icon='pressure'
            title='Pressure'
            info={`${today.main.pressure * 1000}  hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />

          <Tile
            icon='visibility'
            title='Visibility'
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  )
}

export default Forecast
