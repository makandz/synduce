import TextInput from "./TextInput";
import { render, screen, cleanup, fireEvent} from "@testing-library/react";

const textInputProps = {
  id: "ABC123", 
  label: "Test", 
  type: "text" ,
  required: true,
  value: "test@test.com",
  setValue: jest.fn()
}

describe("text input", () => {
  beforeEach(() => {
    // Render the text input field 
    render(<TextInput {...textInputProps}/>)
  })

  // Cleanup is done automatically by testing library 
  afterEach(cleanup);

  it("has correct label", () => {
    const labelNode = screen.getByText(/test */i);
    expect(labelNode).toBeInstanceOf(HTMLLabelElement);
    expect(labelNode.textContent).toBe("Test *");
    expect(labelNode.htmlFor).toBe("ABC123");
  })

  it("has correct input", () => {
    const inputNode = screen.getByLabelText(/test */i);
    expect(inputNode.id).toBe("ABC123");
    expect(inputNode.value).toBe("test@test.com");
    expect(inputNode.type).toBe("text");
    // Fires an onChange event
    fireEvent.change(inputNode, {target: {value: 'user@user.com'}});
    expect(textInputProps.setValue).toHaveBeenCalledTimes(1);
  });
});