import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CostAnalysisData } from '../types';

interface CostAnalysisChartProps {
  data: CostAnalysisData[];
  loading: boolean;
}

const COLORS = ['#1976D2', '#1565C0', '#42A5F5', '#0D47A1', '#64B5F6'];

const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({ data, loading }) => (
  <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
        Material Cost Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Total cost distribution by material
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Cost']}
            />
            <Bar dataKey="totalCost" radius={[4, 4, 0, 0]} name="Total Cost">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
);

export default CostAnalysisChart;
