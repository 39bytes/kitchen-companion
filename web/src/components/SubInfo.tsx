import { Box, BoxProps, Typography } from "@mui/material";

type SubInfoProps = BoxProps & {
  icon: React.ReactNode;
  text: string;
};

export const SubInfo = ({ icon, text, ...props }: SubInfoProps) => (
  <Box display="flex" alignItems="center" mt={1} color="neutral.500" {...props}>
    {icon}
    <Typography sx={{ ml: 0.5 }} variant="subtitle2">
      {text}
    </Typography>
  </Box>
);
