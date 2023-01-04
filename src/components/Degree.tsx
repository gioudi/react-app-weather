type Props = {
    temp: number;
};

const Degree = ({ temp }: Props): JSX.Element => (
    <span>
        {temp} <sup>o</sup>
    </span>
);
export default Degree;
