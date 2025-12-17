import { CodeIcon, LayoutDashboardIcon, VideoIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

export const MainContentSection = (): JSX.Element => {
    // Navigation items data
    const navItems = [
        {
            icon: <LayoutDashboardIcon className="w-4 h-4" />,
            text: "Projects",
            active: false,
        },
        {
            icon: <VideoIcon className="w-4 h-4" />,
            text: "Project Videos",
            active: true,
        },
        {
            icon: <CodeIcon className="w-4 h-4" />,
            text: "Open Source",
            active: false,
        },
    ];

    return (
        <nav className="flex items-center justify-between w-full py-4 px-10">
            {/* Logo/Brand section */}
            <div className="flex items-center gap-3">
                <div className="relative w-5 h-[24.96px] bg-[url(https://c.animaapp.com/mdhe93boXq2jgO/img/vector.svg)] bg-[100%_100%]" />
                <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                    SuiTube
                </div>
            </div>

            {/* Navigation items */}
            <div className="flex items-center gap-[59px]">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        {item.icon}
                        <div
                            className={`[font-family:${
                                item.active
                                    ? "'Satoshi-Medium'"
                                    : "'Satoshi-Regular'"
                            },Helvetica] ${
                                item.active
                                    ? "font-medium text-white"
                                    : "font-normal text-[#e6ecff]"
                            } text-base tracking-[0.16px]`}
                        >
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit button */}
            <Button
                variant="outline"
                className="h-[50px] rounded-[999px] border border-solid border-[#ffffff1a] px-8 py-[5px]"
            >
                <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base text-center leading-6">
                    Submit Your Project
                </span>
            </Button>
        </nav>
    );
};
