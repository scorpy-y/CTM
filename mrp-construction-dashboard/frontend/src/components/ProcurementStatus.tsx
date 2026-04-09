import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  CircularProgress,
  Grid,
} from '@mui/material';
import { FaTruck } from 'react-icons/fa';
import { ProcurementData } from '../types';

interface ProcurementStatusProps {
  data: ProcurementData[];
  loading: boolean;
}

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
  Pending: 'warning',
  Partial: 'default',
  Complete: 'success',
};

const progressColors: Record<string, string> = {
  Pending: '#F57C00',
  Partial: '#1976D2',
  Complete: '#388E3C',
};

const ProcurementStatus: React.FC<ProcurementStatusProps> = ({ data, loading }) => (
  <Card elevation={2} sx={{ borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FaTruck size={20} color="#1976D2" />
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Procurement Status
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ordered vs Delivered quantities by material
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} md={6} key={item.name}>
              <Box sx={{ p: 2, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.status}
                    color={statusColors[item.status]}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 1,
                    backgroundColor: '#E0E0E0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: progressColors[item.status],
                      borderRadius: 5,
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Delivered: {item.delivered.toLocaleString()} / {item.ordered.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color={progressColors[item.status]}>
                    {item.progress}%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  Supplier: {item.supplier}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </CardContent>
  </Card>
);

export default ProcurementStatus;
