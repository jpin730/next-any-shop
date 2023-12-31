import { Box, CircularProgress, Typography } from '@mui/material'
import { type FC } from 'react'

export const FullScreenLoading: FC = () => {
  return (
    <Box
      className="fadeIn"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography sx={{ mb: 3 }} variant="h2" fontWeight={200} fontSize={20}>
        Loading...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  )
}
