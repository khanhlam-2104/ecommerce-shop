// Import the IconType from react-icons
import { Icon } from '@mui/material';
import { IconType } from 'react-icons';

// Define the ButtonProps interface
interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string;
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Define the Button component
const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    icon: Icon,
    onClick,
}) => {
    // Return a button element instead of a div
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
      ${disabled ? "opacity-70 cursor-not-allowed" : ""}
      rounded-md
      hover:opacity-80
      transition
      w-full
      border-slate-700
      flex
      items-center
      justify-center
      gap-2
      ${outline ? "bg-white text-slate-700" : "bg-slate-700 text-white"}
      ${small ? "text-sm font-light py-1 px-2 border-[1px]" : "text-md font-semibold py-3 px-4 border-2"}
      ${custom ? custom : ""}
    `}
        >
            {Icon && <Icon size={24} />}
            {label}
        </button>
    );
};

// Export the Button component
export default Button;