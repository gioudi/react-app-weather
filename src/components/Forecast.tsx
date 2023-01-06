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
import Tile from './Tile'

type Props = {
  payload: forecastType
}

const Forecast = ({ payload }: Props): JSX.Element => {
  const today = payload.list[0]
  return (
    <div
      className=' w-full py-4  px-4
                md:px-10  h-screen lg:h-auto'
    >
      <article className='flex justify-between'>
        <section className='relative mb-20  md:mr-10 bg-zinc-900 h-auto w-2/4 backdrop-blur-lg rounded-3xl drop-shadow-lg py-6 px-8 '>
          <div className='flex justify-between'>
            <div className='mr-3'>
              <h6 className='text-2xl font-medium text-zinc-50 '>
                {payload.name}, {payload.country}
              </h6>
              <p className='text-xs text-zinc-50'>
                H: <Degree temp={Math.ceil(today.main.temp_max)} />
                L: <Degree temp={Math.floor(today.main.temp_min)} />
              </p>
            </div>
            <div className='flex items-center'>
              <div className='text-xs font-bold flex mr-4 w-14 flex-col items-center bg-white/20  backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
                <img className='h-10' src={require('../assets/img/SunSet.png')} />
                <span className=''>{getSunTime(payload.sunrise)}</span>
              </div>
              <div
                className='text-xs font-bold flex  w-14
 flex-col items-center bg-white/20  backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'
              >
                <img className='h-10' src={require('../assets/img/SunRise.png')} />
                <span>{getSunTime(payload.sunset)}</span>
              </div>
            </div>
          </div>
          <h2 className='text-6xl text-zinc-50 font-bold mb-10'>
            <Degree temp={Math.round(today.main.temp)} />
          </h2>
          <p className='text-sm text-zinc-50'>
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <img
            src={require(`../assets/img/${today.weather[0].icon}.png`)}
            className='absolute  top-16 md:bottom-9 lg:right-0 h-auto lg:top-40'
          />
        </section>

        <section className='flex lg:inline-flex overflow-x-scroll w-[300px] lg:w-2/4 h-full overflow-y-hidden  py-2 mb-30'>
          {payload.list.map((item, index) => (
            <div
              key={index}
              className='bg-zinc-900 w-24 h-36 inline-block text-center backdrop-blur-lg rounded-lg mx-3 p-2 flex-shrink-0'
            >
              <p className='text-sm text-zinc-50'>
                {index === 0 ? 'Now' : new Date(item.dt_txt).getDate()}
              </p>
              <img
                src={require(`../assets/img/${today.weather[0].icon}.png`)}
                alt={`weather-icon-${item.weather[0].description}`}
                className=''
              />

              <p className='text-sm font-bold text-zinc-50'>
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
      </article>
      <section className='flex lg:inline-flex overflow-x-scroll justify-between lg:overflow-hidden w-full  h-full overflow-y-hidden  py-2'>
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
  )
}

export default Forecast
