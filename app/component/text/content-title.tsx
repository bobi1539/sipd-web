interface ContentTitleProps {
    title: string;
}

export default function ContentTitle(props: Readonly<ContentTitleProps>) {
    return <h1 className="mb-4 font-bold text-xl md:text-3xl text-primary-700 capitalize">{props.title}</h1>;
}
