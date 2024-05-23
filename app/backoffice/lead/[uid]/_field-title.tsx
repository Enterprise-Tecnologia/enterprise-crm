
export const FieldTitle = ({label}: {label: string}) => {

    return (
        <h2
            className={
                "text-lg font-bold underline underline-offset-2 py-2"
            }
        >
            {label}
        </h2>
    );
};
