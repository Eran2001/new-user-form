const Checkbox = ({ label, register, name }) => (
  <div className="mb-4 flex items-center">
    <input type="checkbox" {...register(name)} className="mr-2" />
    <label className="text-sm">{label}</label>
  </div>
);

export default Checkbox;
