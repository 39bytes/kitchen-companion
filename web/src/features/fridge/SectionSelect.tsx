import { FridgeSection } from "../../api/types/userfridge";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectProps } from "@mui/material/Select";

type SectionSelectProps = {
  value: FridgeSection;
  onChange?: (event: SelectChangeEvent<any>) => void;
};

export const SectionSelect = ({ value, onChange }: SectionSelectProps) => (
  <Select size="small" label="Section" value={value} onChange={onChange}>
    <MenuItem key="pantry" value="pantry">
      Pantry
    </MenuItem>
    <MenuItem key="fridge" value="fridge">
      Fridge
    </MenuItem>
    <MenuItem key="freezer" value="freezer">
      Freezer
    </MenuItem>
  </Select>
);
