import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ConsumptionData } from '../types';

interface ConsumptionChartProps {
  data: ConsumptionData[];
  loading: boolean;
}

const COLORS = ['#1976D2', '#42A5F5'];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600}>
      {`${value}%`}
    </text>
  );
};

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ data, loading }) => (
  <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
        Material Consumption
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Used vs Remaining percentage breakdown
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: { payload?: ConsumptionData }) => [
                `${value}% (${props.payload?.quantity.toLocaleString()} units)`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
);

export default ConsumptionChart;
