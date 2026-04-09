import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Material } from '../types';

interface MaterialsTableProps {
  data: Material[];
  loading: boolean;
}

type Order = 'asc' | 'desc';
type SortKey = keyof Pick<
  Material,
  'name' | 'requiredQuantity' | 'availableQuantity' | 'orderedQuantity' | 'unitCost'
>;

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
  Pending: 'warning',
  Partial: 'default',
  Complete: 'success',
};

const MaterialsTable: React.FC<MaterialsTableProps> = ({ data, loading }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortKey>('name');
  const [filter, setFilter] = useState('');

  const handleSort = (key: SortKey) => {
    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const filtered = useMemo(() => {
    return data
      .filter((m) => m.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        const aVal = a[orderBy];
        const bVal = b[orderBy];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return order === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
  }, [data, filter, order, orderBy]);

  const columns: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Material' },
    { key: 'requiredQuantity', label: 'Required Qty' },
    { key: 'availableQuantity', label: 'Available Qty' },
    { key: 'orderedQuantity', label: 'Ordered Qty' },
    { key: 'unitCost', label: 'Unit Cost ($)' },
  ];

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Material Inventory Data
          </Typography>
          <TextField
            size="small"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: 220 }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ fontWeight: 700 }}>
                      <TableSortLabel
                        active={orderBy === col.key}
                        direction={orderBy === col.key ? order : 'asc'}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 700 }}>Shortage</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total Cost</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((mat) => {
                  const shortage = Math.max(0, mat.requiredQuantity - mat.availableQuantity);
                  const totalCost = mat.unitCost * mat.requiredQuantity;
                  return (
                    <TableRow
                      key={mat._id}
                      hover
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {mat.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mat.category}
                        </Typography>
                      </TableCell>
                      <TableCell>{mat.requiredQuantity.toLocaleString()} {mat.unit}</TableCell>
                      <TableCell>{mat.availableQuantity.toLocaleString()} {mat.unit}</TableCell>
                      <TableCell>{mat.orderedQuantity.toLocaleString()} {mat.unit}</TableCell>
                      <TableCell>${mat.unitCost.toFixed(2)}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color={shortage > 0 ? 'error.main' : 'success.main'}
                          fontWeight={600}
                        >
                          {shortage > 0 ? shortage.toLocaleString() : '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>${totalCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={mat.status}
                          color={statusColors[mat.status]}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
