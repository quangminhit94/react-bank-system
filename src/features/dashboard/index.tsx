import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { CustomerRankingList, TransactionRankingList } from './components/RankingList';
import { StatisticItem } from './components/StatisticItem';
import { Widget } from './components/Widget';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestCustomerList, selectLowestCustomerList, selectRankingTransactionByAccountList } from './dashboardSlice';

export interface DashboardPageProps {
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  }
}))

export function DashboardPage (props: DashboardPageProps) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  const highestCustomerList = useAppSelector(selectHighestCustomerList)
  const lowestCustomerList = useAppSelector(selectLowestCustomerList)
  const rankingTransactionByAccountList = useAppSelector(selectRankingTransactionByAccountList)

  const classes = useStyles()
  
  console.log({
    loading,
    statistics,
    highestCustomerList,
    lowestCustomerList,
    rankingTransactionByAccountList
  });

  React.useEffect(() => {
    dispatch(dashboardActions.fetchData())
  }, [dispatch])
  return (
    <Box className={classes.root}>
      {/* loading */}
      {loading && <LinearProgress className={classes.loading}/>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem 
            icon={<PeopleAlt fontSize="large" color="primary" />} 
            label="male"
            value={statistics.maleCount}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem 
            icon={<ChatRounded fontSize="large" color="primary" />} 
            label="female"
            value={statistics.femaleCount}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem 
            icon={<ChatBubble fontSize="large" color="primary" />} 
            label="Member Score >= 8"
            value={statistics.highScoreCount}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem 
            icon={<LinearScaleSharp fontSize="large" color="primary" />} 
            label="Member Score <= 5"
            value={statistics.lowScoreCount}/>
        </Grid>
      </Grid>

      {/* Customer ranking list */}
      <Box mt={4}>
        <Typography variant="h4">All Customers</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Customer with highest score">
              <CustomerRankingList customerList={highestCustomerList}/>
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Customer with lowest score">
              <CustomerRankingList customerList={lowestCustomerList}/>
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* account ranking list */}
      <Box mt={4}>
        <Typography variant="h4">Top Accounts</Typography>
        <Grid container spacing={3}>
          {rankingTransactionByAccountList.map(ranking => (
            <Grid item xs={12} md={6} lg={4} key={ranking.accountId}>
              <Widget title={ranking.accountNumber}>
                <TransactionRankingList rankingList={ranking.rankingTransactionList}/>
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
