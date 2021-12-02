import DisplayBox from "./DisplayBox";
import { render, screen, cleanup, fireEvent} from "@testing-library/react";

const displayBoxProps = {
  bgColor: "rgb(248, 215, 218)",
  borderColor: "rgb(248, 215, 218)",
  color: "rgb(114, 28, 36)",
  w: "100%",
  h: "auto",
  text: "Some display message",
  style: { alignSelf: "center", marginBottom: "20px" }
}

describe("display box", () => {
  beforeEach(() => {
    // Render the text input field 
    render(<DisplayBox {...displayBoxProps} />)
  })
  // Cleanup is done automatically by testing library 
  afterEach(cleanup);

  it("has correct values based on props", () => {
    const displayMessage = screen.getByText(/some display message/i);
    const displayBox = displayMessage.parentElement;
    // Match all content and styles based on props
    expect(displayMessage.textContent).toBe(displayBoxProps.text);
    expect(displayBox.style.width).toBe(displayBoxProps.w);
    expect(displayBox.style.height).toBe(displayBoxProps.h);
    expect(displayBox.style.background).toBe(displayBoxProps.bgColor);
    expect(displayBox.style.borderColor).toBe(displayBoxProps.borderColor);
    expect(displayBox.style.color).toBe(displayBoxProps.color);
    expect(displayBox.style.alignSelf).toBe(displayBoxProps.style.alignSelf);
    expect(displayBox.style.marginBottom).toBe(displayBoxProps.style.marginBottom);
  })
})