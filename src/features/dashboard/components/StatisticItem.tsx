import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridAutoColumns: '1fr 1fr',
    gridAutoFlow: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`
  }
}))

export function StatisticItem ({icon, label, value}: StatisticItemProps) {
  const classes = useStyles()
  return (
    <div>
      <Paper className={classes.root}>
        <Box>
          {icon}
        </Box>
        <Box>
          <Typography variant="h5">{value}</Typography>
          <Typography variant="caption">{label}</Typography>
        </Box>
      </Paper>
    </div>
  );
}
