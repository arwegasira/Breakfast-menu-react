import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useLoaderData } from 'react-router-dom'
const RechartBar = () => {
  const { items } = useLoaderData()
  console.log(items)
  return (
    <ResponsiveContainer
      width='100%'
      height={400}
      margin={{
        left: 0,
        right: 0,
        top: 5,
        bottom: 5,
      }}
      padding={{ left: 0, right: 0 }}
    >
      <BarChart data={items}>
        <CartesianGrid strokeDasharray='3 3'></CartesianGrid>
        <XAxis dataKey='_id' padding={{ left: 0, right: 0 }}></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        <Bar dataKey='total' fill='#8884d8'></Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
export default RechartBar
