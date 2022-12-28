import { FridgeSection } from "@backend/userfridge";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectProps } from "@mui/material/Select";

type SectionSelectProps = {
  defaultValue?: string;
  onChange?: (event: SelectChangeEvent<any>) => void;
};

export const SectionSelect = ({
  defaultValue,
  onChange,
}: SectionSelectProps) => (
  <Select
    size="small"
    label="Section"
    defaultValue={defaultValue}
    onChange={onChange}
  >
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
