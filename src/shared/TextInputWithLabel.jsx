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
      <input
        type="text"
        ref={ref}
        id={elementId}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
