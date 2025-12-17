import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

export const VideoDetailPage = (): JSX.Element => {
    // Project data
    const projectData = {
        name: "Aftermath Finance",
        logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
        categories: ["DeFi", "Open Source"],
        description:
            "Aftermath is built for traders and investors who value speed, transparency, and decentralization. Powered by the Sui blockchain, our platform ensures optimal deals with minimal costs.",
        videoThumbnail:
            "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95-10.png",
    };

    // Related videos data
    const relatedVideos = [
        {
            id: 1,
            name: "Aftermath Finance",
            thumbnail: "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95.png",
            logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
            categories: ["DeFi", "Tooling"],
        },
        {
            id: 2,
            name: "Scallop",
            thumbnail:
                "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95-2.png",
            logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
            categories: ["DeFi", "Tooling"],
        },
        {
            id: 3,
            name: "Suilend",
            thumbnail:
                "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95-4.png",
            logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
            categories: ["DeFi", "Tooling"],
        },
        {
            id: 4,
            name: "SuiNS",
            thumbnail:
                "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95-6.png",
            logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
            categories: ["DeFi", "Tooling"],
        },
        {
            id: 5,
            name: "AlphaFi",
            thumbnail:
                "https://c.animaapp.com/mdhe93boXq2jgO/img/frame-95-8.png",
            logo: "https://c.animaapp.com/mdhe93boXq2jgO/img/image-10.png",
            categories: ["DeFi", "Tooling"],
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-black p-4">
            <main className="relative w-full max-w-[1280px] bg-[#050505] rounded-[20px] overflow-hidden">
                <div className="w-full bg-[url(https://c.animaapp.com/mdhe93boXq2jgO/img/section---hero.svg)] bg-cover">
                    {/* Header Navigation */}
                    <nav className="flex items-center justify-between w-full py-4 px-10">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="relative w-5 h-[24.96px] bg-[url(https://c.animaapp.com/mdhe93boXq2jgO/img/vector.svg)] bg-[100%_100%]" />
                            <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                                SuiTube
                            </div>
                        </Link>

                        <div className="flex items-center gap-[59px]">
                            <Link
                                to="/"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 9.5H9C9.82843 9.5 10.5 8.82843 10.5 8V2C10.5 1.17157 9.82843 0.5 9 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V8C0.5 8.82843 1.17157 9.5 2 9.5Z"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7 9.5V14C7 14.3978 6.84196 14.7794 6.56066 15.0607C6.27936 15.342 5.89782 15.5 5.5 15.5H2C1.60218 15.5 1.22064 15.342 0.93934 15.0607C0.65804 14.7794 0.5 14.3978 0.5 14V12"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 6.5V12C14 12.3978 13.842 12.7794 13.5607 13.0607C13.2794 13.342 12.8978 13.5 12.5 13.5H10"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.5 3.5H14C14.3978 3.5 14.7794 3.65804 15.0607 3.93934C15.342 4.22064 15.5 4.60218 15.5 5V8"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="font-normal text-[#e6ecff] text-base tracking-[0.16px] [font-family:'Satoshi-Regular',Helvetica]">
                                    Projects
                                </div>
                            </Link>

                            <Link
                                to="/videos"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.5 4.5V11.5C15.5 12.3284 14.8284 13 14 13H2C1.17157 13 0.5 12.3284 0.5 11.5V4.5C0.5 3.67157 1.17157 3 2 3H14C14.8284 3 15.5 3.67157 15.5 4.5Z"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.5 8L6.5 5.5V10.5L10.5 8Z"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="font-medium text-white text-base tracking-[0.16px] [font-family:'Satoshi-Medium',Helvetica]">
                                    Project Videos
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 cursor-pointer">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.5 0.5H4C3.17157 0.5 2.5 1.17157 2.5 2V14C2.5 14.8284 3.17157 15.5 4 15.5H12C12.8284 15.5 13.5 14.8284 13.5 14V5.5L8.5 0.5Z"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.5 0.5V5.5H13.5"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.5 9L8 11.5L5.5 9"
                                        stroke="#E6ECFF"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="font-normal text-[#e6ecff] text-base tracking-[0.16px] [font-family:'Satoshi-Regular',Helvetica]">
                                    Open Source
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="h-[50px] rounded-[999px] border border-solid border-[#ffffff1a] px-8 py-[5px] bg-transparent"
                        >
                            <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base text-center leading-6">
                                Submit Your Project
                            </span>
                        </Button>
                    </nav>

                    {/* Main Content */}
                    <div className="px-10 py-8">
                        <div className="flex gap-10">
                            {/* Video Player Section */}
                            <div className="flex-1">
                                <Card className="w-full h-[683px] overflow-hidden rounded-[20px] relative p-0 border-0">
                                    {/* Video thumbnail */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${projectData.videoThumbnail})`,
                                        }}
                                    />

                                    {/* Sound control button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-[17px] right-[17px] w-[40px] h-[40px] rounded-full bg-gradient-to-b from-black/40 to-black/30 border-0 shadow-[inset_0px_3px_4px_#ffffff1a] backdrop-blur-[2px] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-full before:bg-gradient-to-br before:from-white/32 before:to-white/16 before:pointer-events-none"
                                    >
                                        <img
                                            className="w-8 h-8"
                                            alt="Volume high"
                                            src="https://c.animaapp.com/mdhe93boXq2jgO/img/volume-high.svg"
                                        />
                                    </Button>

                                    {/* Project info overlay */}
                                    <div className="absolute w-full h-[207px] bottom-0 left-0 rounded-[20px] backdrop-blur-[0.15px] bg-gradient-to-t from-black/84 via-black/50 to-transparent">
                                        <div className="p-5">
                                            {/* Logo and categories */}
                                            <div className="flex items-end gap-6 mb-6">
                                                {/* Project logo */}
                                                <div className="p-[1.5px] rounded-lg inline-flex items-center justify-center relative overflow-hidden">
                                                    <div className="w-[52px] h-[52px] rounded-lg bg-gradient-to-br from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                                    <div className="w-[52px] h-[52px] rounded-lg bg-gradient-to-tl from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                                    <div className="inline-flex items-center justify-center p-2.5 relative bg-black rounded-lg">
                                                        <div
                                                            className="w-[29px] h-[29px] relative bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url(${projectData.logo})`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Category badges */}
                                                <div className="flex items-center gap-1.5">
                                                    {projectData.categories.map(
                                                        (category, index) => (
                                                            <Badge
                                                                key={index}
                                                                className="h-[30.84px] px-[14.8px] py-[6.78px] rounded-[140.61px] bg-[radial-gradient(50%_50%_at_13%_4%,rgba(18,20,38,0.6)_0%,rgba(0,0,0,0.6)_100%)] backdrop-blur-[3.65px] border-0 before:content-[''] before:absolute before:inset-0 before:p-[0.62px] before:rounded-[140.61px] before:bg-gradient-to-b before:from-white/50 before:to-gray-500/7 before:pointer-events-none"
                                                            >
                                                                <span className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-[10px] tracking-[-0.20px] leading-[15.8px]">
                                                                    {category}
                                                                </span>
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Project title and description */}
                                            <div className="flex flex-col gap-2">
                                                <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-2xl tracking-[-0.48px] leading-7">
                                                    {projectData.name}
                                                </h3>
                                                <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] line-clamp-2">
                                                    {projectData.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Action buttons column */}
                            <div className="flex flex-col w-[55px] items-start gap-5">
                                {/* Website button */}
                                <div className="p-[1.5px] rounded-lg inline-flex items-center justify-center relative overflow-hidden">
                                    <div className="w-[55px] h-[55px] rounded-lg bg-gradient-to-br from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                    <div className="w-[55px] h-[55px] rounded-lg bg-gradient-to-tl from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                    <Button
                                        variant="default"
                                        className="p-2.5 bg-black rounded-lg"
                                    >
                                        <img
                                            className="w-8 h-8"
                                            alt="Internet"
                                            src="https://c.animaapp.com/mdhe93boXq2jgO/img/internet.svg"
                                        />
                                    </Button>
                                </div>

                                {/* Separator */}
                                <img
                                    className="w-full"
                                    alt="Container"
                                    src="https://c.animaapp.com/mdhe93boXq2jgO/img/container.svg"
                                />

                                {/* Share button */}
                                <div className="p-[1.5px] rounded-lg inline-flex items-center justify-center relative overflow-hidden">
                                    <div className="w-[55px] h-[55px] rounded-lg bg-gradient-to-br from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                    <div className="w-[55px] h-[55px] rounded-lg bg-gradient-to-tl from-[rgba(77,162,255,1)] to-[rgba(77,162,255,0)] absolute top-0 left-0" />
                                    <Button
                                        variant="default"
                                        className="p-2.5 bg-black rounded-lg"
                                    >
                                        <img
                                            className="w-8 h-8"
                                            alt="Share"
                                            src="https://c.animaapp.com/mdhe93boXq2jgO/img/share-01.svg"
                                        />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Related Videos Section */}
                        <div className="mt-12">
                            <h2 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-[32px] tracking-[0.32px] mb-8">
                                Related Videos
                            </h2>

                            <div className="flex gap-6 overflow-x-auto pb-4">
                                {relatedVideos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="flex flex-col w-[203px] gap-2.5 flex-shrink-0"
                                    >
                                        <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[61px] h-[61px] rounded-full flex items-center justify-center p-2.5 border-none shadow-[inset_0px_3px_4px_#ffffff1a] backdrop-blur-[2px] bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.3)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-full before:bg-[linear-gradient(153deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.16)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
                                                variant="ghost"
                                            >
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.334 8.00033L22.0007 16.0003L11.334 24.0003V8.00033Z"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center p-[0.75px] rounded overflow-hidden">
                                                    <div className="absolute w-[26px] h-[26px] top-0 left-0 rounded bg-[linear-gradient(302deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="absolute w-[26px] h-[26px] top-0 left-0 rounded bg-[linear-gradient(139deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="inline-flex items-center justify-center p-[5px] relative bg-black rounded">
                                                        <div
                                                            className="w-[14.5px] h-[14.5px] bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url(${video.logo})`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-lg tracking-[-0.48px] leading-7">
                                                {video.name}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            {video.categories.map(
                                                (category, index) => (
                                                    <Badge
                                                        key={`${video.id}-category-${index}`}
                                                        className="h-[30.84px] rounded-[140.61px] pt-[6.78px] pb-[7.4px] px-[14.8px] border-none backdrop-blur-[3.65px] bg-[radial-gradient(50%_50%_at_13%_4%,rgba(18,20,38,0.6)_0%,rgba(0,0,0,0.6)_100%)] before:content-[''] before:absolute before:inset-0 before:p-[0.62px] before:rounded-[140.61px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(153,153,153,0.07)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
                                                    >
                                                        <span className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-[10px] tracking-[-0.20px] leading-[15.8px]">
                                                            {category}
                                                        </span>
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="w-full px-10 py-8 border-t border-[#ffffff1a]">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdhco1b4hv2VQG/img/vector.svg)] bg-[100%_100%]" />
                                    <span className="[font-family:'TWK_Everett-Medium',Helvetica] text-xl font-medium text-white">
                                        SuiTube
                                    </span>
                                </div>
                                <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#e6ecffb2] text-base tracking-[-0.32px] leading-[25.6px]">
                                    © Copyright 2025, Sui Foundation
                                </p>
                            </div>

                            <div className="col-span-1">
                                {/* Empty column for spacing */}
                            </div>

                            <div className="col-span-1 grid grid-cols-2">
                                <div>
                                    <a
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px]"
                                    >
                                        Docs
                                    </a>
                                    <a
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px]"
                                    >
                                        Developer Portal
                                    </a>
                                    <a
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px]"
                                    >
                                        Media Kit
                                    </a>
                                    <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#e6ecffb2] text-base tracking-[-0.05px] leading-[25.6px] mt-[20px]">
                                        Designed with ❤ by{" "}
                                        <span className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white">
                                            @ParryDesigns
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <a
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px]"
                                    >
                                        Mysten Labs
                                    </a>
                                    <a
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px]"
                                    >
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};
