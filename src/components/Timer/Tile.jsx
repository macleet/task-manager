export default ({children, ref, style, colSpan, rowSpan}) => {
    return(
        <div ref={ref} className={`${style} bg-slate-500 bg-opacity-20 shadow flex flex-col overflow-hidden rounded-lg p-5 col-span-${colSpan} row-span-${rowSpan}`} >
            {children}
        </div>
    );
};