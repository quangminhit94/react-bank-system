import { Meta, Story} from '@storybook/react'
import {StatisticItem, StatisticItemProps } from './StatisticItem'
import { PeopleAlt } from '@material-ui/icons';
const meta: Meta = {
  title: 'StatisticItem',
  component: StatisticItem
}

export default meta

export const Default = () => (
  <StatisticItem 
    icon={<PeopleAlt fontSize="large" color="primary" />} 
    label="male"
    value="100"/>
)
