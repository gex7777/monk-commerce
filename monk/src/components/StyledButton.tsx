import { Button, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  text: string;
}
export default function StyledButton({ text, ...others }: Props) {
  return (
    <Button
      {...others}
      sx={{
        flex: 1,
        width: "100%",
        textTransform: "none",
        boxShadow: "none",
        height: "32px",
        px: "25px",
      }}
    >
      {text}
    </Button>
  );
}
