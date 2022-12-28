import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type UnitSelectProps = {
  units: string[];
  defaultValue?: string;
  onChange?: (event: SelectChangeEvent<any>) => void;
};

export const UnitSelect = ({
  units,
  defaultValue,
  onChange,
}: UnitSelectProps) => (
  <Select
    defaultValue={defaultValue}
    size="small"
    label="Unit"
    onChange={onChange}
  >
    {units.map((u) => {
      return (
        <MenuItem key={u} value={u}>
          {u}
        </MenuItem>
      );
    })}
  </Select>
);
