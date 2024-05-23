
export const FieldValue = ({label, value}: {label: string, value: any}) => {

    return (
        <div>
            <h5
                className={
                    `text-sm font-bold`
                }
            >
                {label}
            </h5>
            <span
                className={
                    `text-xs font-semibold text-zinc-500`
                }
            >
                {value}
            </span>
        </div>
    );
};
