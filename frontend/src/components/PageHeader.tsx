import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  action?: ReactNode;
}

export default function PageHeader({ title, action }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {action}
    </Box>
  );
}
