import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 700,
  },
}))(Tooltip);

export default CustomTooltip;
