import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFooterItem = styled(ListItem)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
