import { Box, useTheme } from "@mui/material";

type FillBarProps = {
  fillPercent: number;
  width: string | number;
  color: string;
};

export const FillBar = ({ fillPercent, width, color }: FillBarProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "inline-block",
        bgcolor: theme.palette.grey[200],
        width: width,
        height: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: color,
          width: `${fillPercent}%`,
          height: "100%",
        }}
      ></Box>
    </Box>
  );
};
