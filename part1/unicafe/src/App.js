import React, {useState} from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Statistics = ({statics}) =>{
  if(statics.total === 0){
    return (
      <div>
      <h2>Statistics</h2>
      <p>No feedback data</p>
    </div>
    )
  }return (
    <div>
    <h2>Statistics</h2>
    <table>
      <StatisticLine text='Good' value={statics.good}></StatisticLine>
      <StatisticLine text='Neutral' value={statics.neutral}></StatisticLine>
      <StatisticLine text='Bad' value={statics.bad}></StatisticLine>
      <StatisticLine text='Total' value={statics.total}></StatisticLine>
      <StatisticLine text='Average' value={(statics.good-statics.bad)/statics.total}></StatisticLine>
      <StatisticLine text='Positive' value={statics.good/statics.total*100}>%</StatisticLine>
     </table>
  </div>
    )

}

const StatisticLine = ({text,value}) =>{
  return(
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Button = ({onClick,text}) =>{
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {

  const title = 'Give us feedback'
  const [statics, setStatics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  })

  const incrGood = () =>{
    setStatics({
      ...statics,
      good: statics.good + 1,
      total: statics.total +1
    })
  }
  const incrNeutral = () =>{
    setStatics({
      ...statics,
      neutral: statics.neutral + 1,
      total: statics.total +1
    })
  }
  const incrBad = () =>{
    setStatics({
      ...statics,
      bad: statics.bad + 1,
      total: statics.total +1
    })
  }

  return (
    <div>
        <Title title={title}></Title>
        <Button onClick={incrGood} text='Good'></Button>
        <Button onClick={incrNeutral} text='Neutral'></Button>
        <Button onClick={incrBad} text='Bad'></Button>
        <Statistics statics={statics}></Statistics>
    </div>
    )

}

export default App