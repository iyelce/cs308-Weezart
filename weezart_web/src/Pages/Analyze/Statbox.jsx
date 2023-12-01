import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";


const Statbox = ({ title, subtitle, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#331055" }}
          >
            {title}
          </Typography>
        </Box>
   
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: "#331055" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default Statbox;