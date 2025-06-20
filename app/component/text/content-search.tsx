interface ContentSearchProps {
    children: React.ReactNode;
}

export default function ContentSearch(props: Readonly<ContentSearchProps>) {
    return <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4">{props.children}</div>;
}
