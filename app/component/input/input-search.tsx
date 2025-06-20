export interface InputSearchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSearch(props: Readonly<InputSearchProps>) {
    return (
        <div className="w-full">
            <div className="flex items-center">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 flex items-center left-0 pl-3 pointer-events-none text-gray-500">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input onChange={props.onChange} id="search" name="search" type="search" className="text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full pl-10 p-2 focus:border-white focus:ring-inset focus:ring-2 focus:ring-primary-700 outline-none" placeholder="Cari..." />
                </div>
            </div>
        </div>
    );
}
