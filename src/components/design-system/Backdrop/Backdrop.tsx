import { Loader } from '..';
import './backdrop.sass';

export interface BackdropProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: React.ReactNode;
}

const Backdrop = (props: BackdropProps) => {
    const { children, ...other } = props;
    return (
        <div className="backdrop" {...other}>
            <Loader />
            <div className="backdrop__body">{children}</div>
        </div>
    );
};

export default Backdrop;
