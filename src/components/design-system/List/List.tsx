import './list.sass';

export type ListProps = HTMLUListElement;

const List = (props: ListProps) => {
    const { children } = props;
    return <ul className="list">{children}</ul>;
};

export default List;
