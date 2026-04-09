import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { GiCementShoes } from 'react-icons/gi';
import { FaWarehouse, FaTruck, FaExclamationTriangle } from 'react-icons/fa';
import { KPIData } from '../types';

interface KPICardsProps {
  data: KPIData | null;
}

const kpiConfig = [
  {
    label: 'Total Materials Required',
    key: 'totalRequired' as keyof KPIData,
    icon: <GiCementShoes size={36} color="#1976D2" />,
    color: '#1976D2',
    bg: '#E3F2FD',
  },
  {
    label: 'Materials in Stock',
    key: 'totalAvailable' as keyof KPIData,
    icon: <FaWarehouse size={32} color="#388E3C" />,
    color: '#388E3C',
    bg: '#E8F5E9',
  },
  {
    label: 'Materials Ordered',
    key: 'totalOrdered' as keyof KPIData,
    icon: <FaTruck size={32} color="#F57C00" />,
    color: '#F57C00',
    bg: '#FFF3E0',
  },
  {
    label: 'Material Shortage',
    key: 'totalShortage' as keyof KPIData,
    icon: <FaExclamationTriangle size={32} color="#D32F2F" />,
    color: '#D32F2F',
    bg: '#FFEBEE',
  },
];

const KPICards: React.FC<KPICardsProps> = ({ data }) => (
  <Grid container spacing={3} sx={{ mb: 3 }}>
    {kpiConfig.map((kpi) => (
      <Grid item xs={12} sm={6} md={3} key={kpi.key}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 2,
            borderLeft: `4px solid ${kpi.color}`,
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {kpi.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} color={kpi.color}>
                  {data ? data[kpi.key].toLocaleString() : '—'}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '50%',
                  backgroundColor: kpi.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default KPICards;
