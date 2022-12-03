
const Button = ({ style, text }) => (
    <button type="button" className={`font-poppins font-sm text-[18px] text-primary bg-slate-400 hover:bg-orange-700 rounded-[10px] outline-none ${style}`}>
      { text }
    </button>
);

export default Button