import LinearProgress from '@mui/material/LinearProgress'
import { Box, Typography } from '@mui/material'

const StatBar = ({ label, value, maxValue, color }) => {
  const filledPercentage = (value / maxValue) * 100

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold', color: '#fff' }}>
        {label}:
      </Typography>{" "}
      <Typography variant="subtitle1" component="span" sx={{ color: '#fff' }}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={filledPercentage}
        sx={{
          height: 10,
          borderRadius: '5px',
          marginTop: 1,
          '& .MuiLinearProgress-bar': {
            borderRadius: '5px',
            backgroundColor: color,
          },
        }}
      />
    </Box>
  )
}


export default StatBar