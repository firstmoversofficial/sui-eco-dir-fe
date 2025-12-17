import React from "react";
import { Button } from "../../../../components/ui/button";

export const MainContentSection = (): JSX.Element => {
    return (
        <header className="flex w-full items-center justify-between py-4 px-4 sm:px-6 lg:px-10 mt-2 sm:mt-4 lg:mt-6">
            <div className="flex items-center gap-2">
                <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdei0unhm8Lc4h/img/vector.svg)] bg-[100%_100%]" />
                <h1 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                    SuiTube
                </h1>
            </div>

            <Button
                variant="outline"
                className="bg-transparent hover:bg-[#ffffff1a] text-white border border-[#ffffff1a] rounded-full h-[50px] px-6 sm:px-8"
            >
                <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base">
                    Submit Your Project
                </span>
            </Button>
        </header>
    );
};
