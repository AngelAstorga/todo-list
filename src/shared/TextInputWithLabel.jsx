import StyledTextInputWithLabel from './TextInputWithLabel.styled';
export default function TextInputWithLabel({
  elementId,
  ref,
  onChange,
  labelText,
  value,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <StyledTextInputWithLabel
        type="text"
        ref={ref}
        id={elementId}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
