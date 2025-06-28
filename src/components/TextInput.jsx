const TextInput = ({ label, register, name, errors, placeholder, ...rest }) => {
  const hasError = !!errors[name];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        min="1"
        autoComplete="off"
        {...register(name)}
        placeholder={placeholder}
        {...rest}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextInput;
