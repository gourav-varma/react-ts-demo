import { Container, Button } from "@mui/material";import { MouseEventHandler } from "react";
 
function ButtonEle({text, onclick }: {text: String, onclick: MouseEventHandler }) {
	return (
	  <Container sx={{ my: '14px' }}>
		<Button variant="contained" onClick={onclick} >{text}</Button>
	  </Container>
	);
}

export default ButtonEle;