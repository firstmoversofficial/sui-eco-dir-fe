import React from "react";
import { Separator } from "../../../../components/ui/separator";

export const FeaturedProjectsSection = (): JSX.Element => {
    // Footer links data
    const leftColumnLinks = [
        { text: "Docs", href: "#" },
        { text: "Developer Portal", href: "#" },
        { text: "Media Kit", href: "#" },
    ];

    const rightColumnLinks = [
        { text: "Mysten Labs", href: "#" },
        { text: "Privacy Policy", href: "#" },
    ];

    return (
        <footer className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-10">
            <Separator className="mb-8 bg-[#e6ecffb2]" />

            <div className="flex flex-col md:flex-row justify-between">
                {/* Left side with logo and copyright */}
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdei0unhm8Lc4h/img/vector.svg)] bg-[100%_100%]" />
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                            SuiTube
                        </div>
                    </div>

                    <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#e6ecffb2] text-sm sm:text-base tracking-[-0.32px] leading-[25.6px]">
                        © Copyright 2025, Sui Foundation
                    </div>
                </div>

                {/* Right side with links */}
                <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-16 mt-6 md:mt-0">
                    {/* First column of links */}
                    <div className="flex flex-col space-y-4">
                        {leftColumnLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="[font-family:'Satoshi-Regular',Helvetica] hover:text-[#e6ecffb2] font-normal text-white text-sm sm:text-base tracking-[-0.32px] leading-[25.6px]"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>

                    {/* Second column of links */}
                    <div className="flex flex-col space-y-4">
                        {rightColumnLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="[font-family:'Satoshi-Regular',Helvetica] hover:text-[#e6ecffb2] font-normal text-white text-sm sm:text-base tracking-[-0.32px] leading-[25.6px]"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
