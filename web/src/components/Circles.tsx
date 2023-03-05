import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";

const Circle = styled(Box)`
  border-radius: 50%;
`;

export const Circles = ({ ...props }: BoxProps) => (
  <Box {...props}>
    <Circle bgcolor="teal" width={12} height={12} position="relative" />
    <Circle
      bgcolor="green"
      width={6}
      height={6}
      position="relative"
      left={60}
      bottom={8}
    />
    <Circle
      bgcolor="red"
      width={4}
      height={4}
      position="relative"
      left={56}
      top={24}
    />
    <Circle
      bgcolor="indigo"
      width={4}
      height={4}
      position="relative"
      left={16}
      top={20}
    />
    <Circle
      bgcolor="yellow"
      width={4}
      height={4}
      position="relative"
      left={100}
      top={40}
    />
  </Box>
);
