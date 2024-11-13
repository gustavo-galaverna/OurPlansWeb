import '../style/InputWithLabel.css';

interface InputWithLabelRegisterProps {
    size: 1 | 2 | 3;
    type: 'text' | 'number' | 'date' | 'password' | 'email';
    label: string;
    id: string;
}

const InputWithLabelRegister: React.FC<InputWithLabelRegisterProps> = ({ size, type, label, id }) => {
    const getSizeClass = (size: 1 | 2 | 3): string => {
        switch (size) {
            case 1:
                return 'small';
            case 2:
                return 'medium';
            case 3:
                return 'large';
            default:
                return '';
        }
    };

    return (
        <div className={`input-container ${getSizeClass(size)}`}>
            <span>{label}</span>
            <input id={id} type={type} placeholder={label} />
        </div>
    );
};

export default InputWithLabelRegister;
