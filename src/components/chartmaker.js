import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Sector,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function chartmaker(name, data) {
  if (name === '막대그래프') {
    return (
      <div>
        <h2>CHART</h2>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={Object.keys(data[0])[1]} stackId="a" fill="#8884d8" />
          <Bar dataKey={Object.keys(data[0])[2]} stackId="a" fill="#82ca9d" />
          <Bar dataKey={Object.keys(data[0])[3]} stackId="a" fill="#41ca9d" />
        </BarChart>
      </div>
    );
  } else if (name === '꺽은선그래프') {
    return (
      <div>
        <h2>CHART</h2>
        {/* <Line
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
          }}
        /> */}
      </div>
    );
  } else if (name === '원그래프') {
    return (
      <div>
        <h2>CHART</h2>
        <PieChart width={450} height={400} /* onMouseEnter={onPieEnter} */>
          <Pie
            data={data}
            cx={270}
            cy={150}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    );
  } else {
    return (
      <div>
        <h2>chart</h2>
      </div>
    );
  }
}
