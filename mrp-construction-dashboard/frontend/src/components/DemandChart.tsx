import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DemandAvailabilityData } from '../types';

interface DemandChartProps {
  data: DemandAvailabilityData[];
  loading: boolean;
}

const DemandChart: React.FC<DemandChartProps> = ({ data, loading }) => (
  <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
        Material Demand vs Availability
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Required vs Available stock comparison
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name === 'required' ? 'Required' : 'Available',
              ]}
            />
            <Legend
              formatter={(value) => (value === 'required' ? 'Required' : 'Available')}
            />
            <Bar dataKey="required" fill="#1976D2" radius={[4, 4, 0, 0]} name="required" />
            <Bar dataKey="available" fill="#42A5F5" radius={[4, 4, 0, 0]} name="available" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
);

export default DemandChart;
