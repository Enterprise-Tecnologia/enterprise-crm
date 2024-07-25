'use client';

import { Button } from "@/components/ui/button";


export default function IframeButton() {

    const handleClick = () => {

        parent.location = 'https://google.com.br';

    };

    return (
            <div>
                <Button
                    onClick={handleClick}
                >
                    Abrir tela
                </Button>
            </div>
    );
};
