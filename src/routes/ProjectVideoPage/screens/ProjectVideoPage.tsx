import { PlayIcon, Volume2, X, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
    FrontendAPI,
    ProjectVideo,
    Category,
    Project,
} from "../../../lib/utils";
import MuxPlayer from "@mux/mux-player-react";

export const ProjectVideoPage = (): JSX.Element => {
    const [featuredVideos, setFeaturedVideos] = useState<ProjectVideo[]>([]);
    const [allVideos, setAllVideos] = useState<ProjectVideo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeVideo, setActiveVideo] = useState<ProjectVideo | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [paused, setPaused] = useState<boolean>(false);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const reelRef = useRef<HTMLDivElement | null>(null);
    const [projectLogos, setProjectLogos] = useState<
        Record<string, string | null>
    >({});

    useEffect(() => {
        let cancelled = false;
        async function run() {
            setLoading(true);
            setError(null);
            try {
                const [featRes, allRes, catRes] = await Promise.all([
                    FrontendAPI.listFeaturedVideos(),
                    FrontendAPI.listVideos({
                        limit: 15,
                        category: selectedCategory,
                    }),
                    FrontendAPI.listCategories(),
                ]);
                if (!cancelled) {
                    setFeaturedVideos(featRes.data || []);
                    setAllVideos(allRes.data || []);
                    setCategories(catRes.data || []);
                    // Fetch project logos for both lists
                    const vids = [
                        ...(featRes.data || []),
                        ...(allRes.data || []),
                    ];
                    const ids = Array.from(
                        new Set(vids.map((v) => v.projectId))
                    ).filter(Boolean) as string[];
                    if (ids.length) {
                        try {
                            const results = await Promise.all(
                                ids.map((id) =>
                                    FrontendAPI.getProjectById(id).catch(
                                        () => ({ data: null })
                                    )
                                )
                            );
                            const map: Record<string, string | null> = {};
                            ids.forEach((id, idx) => {
                                const data = (results[idx] as any)
                                    ?.data as Project | null;
                                map[id] = data?.logo || null;
                            });
                            if (!cancelled) setProjectLogos(map);
                        } catch {}
                    }
                }
            } catch (e: any) {
                if (!cancelled) setError(e.message || "Failed to load videos");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, [selectedCategory]);

    const closeOverlay = () => setActiveVideo(null);
    const toggleMute = () => setIsMuted((m) => !m);
    const togglePaused = () => setPaused((p) => !p);
    const toggleFullscreen = async () => {
        const el = reelRef.current;
        if (!el) return;
        // Toggle fullscreen for the reel container
        if (!document.fullscreenElement) {
            await el.requestFullscreen().catch(() => {});
        } else {
            await document.exitFullscreen().catch(() => {});
        }
    };

    const activeMetadata = useMemo(() => {
        if (!activeVideo) return undefined;
        return {
            video_id: activeVideo.id,
            video_title: activeVideo.title,
        } as const;
    }, [activeVideo]);

    // When opening overlay, fetch the associated project for links
    useEffect(() => {
        let cancelled = false;
        if (!activeVideo) {
            setActiveProject(null);
            return;
        }
        setPaused(false);
        setIsMuted(true);
        FrontendAPI.getProjectById(activeVideo.projectId)
            .then((res) => {
                if (!cancelled) setActiveProject(res.data || null);
            })
            .catch(() => {
                if (!cancelled) setActiveProject(null);
            });
        return () => {
            cancelled = true;
        };
    }, [activeVideo]);

    // Footer links
    const footerLinks = {
        resources: ["Docs", "Developer Portal", "Media Kit"],
        company: ["Mysten Labs", "Privacy Policy"],
    };

    return (
        <div className="relative w-full min-w-full bg-[#000000] overflow-hidden flex flex-col">
            <div className="relative w-full min-w-full">
                {/* Background grid */}
                <div className="bg-grid-container h-screen relative">
                    <img
                        className="w-full h-full object-cover object-top"
                        alt="Background grid"
                        src="/bg-grid.svg"
                    />
                </div>

                {/* Blur mask overlay */}
                <div className="blur-mask-container">
                    <img
                        className="w-full h-full"
                        alt="Blur mask"
                        src="/blur-mask.svg"
                    />
                </div>

                {/* Main content overlay */}
                <div className="absolute top-0 left-0 w-full z-30">
                    {/* Header */}
                    <header className="flex w-full items-center justify-between py-4 px-4 sm:px-6 lg:px-10 mt-2 sm:mt-4 lg:mt-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdei0unhm8Lc4h/img/vector.svg)] bg-[100%_100%]" />
                            <h1 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                                Sui Directory
                            </h1>
                        </Link>

                        <Button
                            variant="outline"
                            className="bg-transparent hover:bg-[#ffffff1a] text-white border border-[#ffffff1a] rounded-full h-[50px] px-6 sm:px-8"
                        >
                            <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base">
                                Submit Your Project
                            </span>
                        </Button>
                    </header>

                    {/* Hero section with title */}
                    <div className="flex flex-col items-center mt-16 sm:mt-24 md:mt-32 lg:mt-[194px] px-4 sm:px-6 lg:px-8">
                        <h1 className="w-full max-w-[645px] bg-[linear-gradient(175deg,rgba(255,255,255,1)_0%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-center leading-normal">
                            Featured Videos
                        </h1>

                        <p className="w-full max-w-[559px] mt-6 sm:mt-8 lg:mt-[30px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecffb2] text-lg sm:text-xl text-center tracking-[0.20px] leading-normal px-4">
                            Discover the latest and greatest Sui projects
                            through our curated video collection.
                        </p>
                    </div>

                    {/* Featured Videos Section */}
                    <div className="w-full px-2 sm:px-4 lg:px-6 mt-16 sm:mt-20 lg:mt-24">
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
                            {loading && featuredVideos.length === 0 && (
                                <div className="w-[203px] h-[260px] rounded-[20px] bg-[#0b0b0b] animate-pulse" />
                            )}
                            {!loading && error && (
                                <div className="text-red-400">{error}</div>
                            )}
                            {featuredVideos.map((project) => (
                                <Card
                                    key={project.id}
                                    className="w-[200px] sm:w-[220px] md:w-[240px] bg-transparent border-none"
                                >
                                    <CardContent className="p-0 flex flex-col gap-2.5">
                                        <div
                                            className="relative w-full h-[250px] sm:h-[270px] md:h-[290px] rounded-[20px] overflow-hidden"
                                            style={{
                                                backgroundImage: `url(${project.thumbnail})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "50% 50%",
                                            }}
                                        >
                                            <Button
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[61px] md:h-[61px] rounded-full flex items-center justify-center p-2.5 border-none shadow-[inset_0px_3px_4px_#ffffff1a] backdrop-blur-[2px] bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.3)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-full before:bg-[linear-gradient(153deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.16)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
                                                variant="ghost"
                                                onClick={() =>
                                                    setActiveVideo(project)
                                                }
                                            >
                                                <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-3 w-full">
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center p-[0.75px] rounded overflow-hidden">
                                                    <div className="absolute w-[36px] h-[36px] top-0 left-0 rounded bg-[linear-gradient(302deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="absolute w-[36px] h-[36px] top-0 left-0 rounded bg-[linear-gradient(139deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="inline-flex items-center justify-center p-[7px] relative bg-black rounded">
                                                        <div
                                                            className="w-[22px] h-[22px] bg-cover bg-[50%_50%]"
                                                            style={{
                                                                backgroundImage: `url(${
                                                                    projectLogos[
                                                                        project
                                                                            .projectId
                                                                    ] ||
                                                                    "/sd.svg"
                                                                })`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-lg sm:text-xl md:text-xl tracking-[-0.48px] leading-7 flex-1">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3 flex-wrap">
                                            {(() => {
                                                const icons: JSX.Element[] = [];
                                                const max = 5;
                                                for (
                                                    let i = 0;
                                                    i <
                                                    project.categories.length;
                                                    i++
                                                ) {
                                                    if (i >= max) {
                                                        icons.push(
                                                            <span
                                                                key="more"
                                                                className="text-[#e6ecffb2]"
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                        break;
                                                    }
                                                    const category =
                                                        project.categories[i];
                                                    icons.push(
                                                        <img
                                                            key={`${project.id}-category-${i}`}
                                                            src={`/category/${category
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s*&\s*/g,
                                                                    "-"
                                                                )
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                )
                                                                .replace(
                                                                    /open-source/i,
                                                                    "opensource"
                                                                )}.svg`}
                                                            alt={category}
                                                            className="h-8 w-auto"
                                                        />
                                                    );
                                                }
                                                return icons;
                                            })()}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* All Videos Section */}
            <div className="relative z-40 mt-32 sm:mt-40 lg:mt-48">
                <div className="px-2 sm:px-4 lg:px-6">
                    <h2 className="text-center [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[0.32px] leading-normal mb-8 sm:mb-10 lg:mb-12">
                        All Videos
                    </h2>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecff] text-base tracking-[0.16px] leading-normal">
                            Filter by Categories
                        </p>

                        {/* Category Filter Bar */}
                        <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-[30px] mb-8 sm:mb-12 lg:mb-16">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`transition-transform duration-200 scale-105 hover:scale-110 rounded-full border ${
                                        selectedCategory === category.name
                                            ? "border-[#4DA2FF] bg-[#4DA2FF]/10"
                                            : "border-[#ffffff1a] bg-transparent"
                                    }`}
                                    onClick={() =>
                                        setSelectedCategory((prev) =>
                                            prev === category.name
                                                ? undefined
                                                : category.name
                                        )
                                    }
                                >
                                    <img
                                        src={`public${category.icon}`}
                                        alt={category.name}
                                        className="h-10 sm:h-12"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* All videos grid - UPDATED LAYOUT */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-[50px]">
                            {loading &&
                                allVideos.length === 0 &&
                                Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={`all-skel-${i}`}
                                        className="w-full aspect-[3/4] rounded-[20px] bg-[#0b0b0b] animate-pulse"
                                    />
                                ))}
                            {!loading && error && (
                                <div className="text-red-400 col-span-full">
                                    {error}
                                </div>
                            )}
                            {allVideos.map((project) => (
                                <Card
                                    key={project.id}
                                    className="w-full bg-transparent border-none"
                                >
                                    <CardContent className="p-0 flex flex-col gap-2.5">
                                        <div
                                            className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden"
                                            style={{
                                                backgroundImage: `url(${project.thumbnail})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "50% 50%",
                                            }}
                                        >
                                            <Button
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[61px] md:h-[61px] rounded-full flex items-center justify-center p-2.5 border-none shadow-[inset_0px_3px_4px_#ffffff1a] backdrop-blur-[2px] bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.3)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-full before:bg-[linear-gradient(153deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.16)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
                                                variant="ghost"
                                                onClick={() =>
                                                    setActiveVideo(project)
                                                }
                                            >
                                                <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-3 w-full">
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center p-[0.75px] rounded overflow-hidden">
                                                    <div className="absolute w-[36px] h-[36px] top-0 left-0 rounded bg-[linear-gradient(302deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="absolute w-[36px] h-[36px] top-0 left-0 rounded bg-[linear-gradient(139deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                                    <div className="inline-flex items-center justify-center p-[7px] relative bg-black rounded">
                                                        <div
                                                            className="w-[22px] h-[22px] bg-cover bg-[50%_50%]"
                                                            style={{
                                                                backgroundImage: `url(${
                                                                    projectLogos[
                                                                        project
                                                                            .projectId
                                                                    ] ||
                                                                    "/sd.svg"
                                                                })`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-lg sm:text-xl md:text-xl tracking-[-0.48px] leading-7 flex-1">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3 flex-wrap">
                                            {project.categories.map(
                                                (category, index) => (
                                                    <img
                                                        key={`${project.id}-category-${index}`}
                                                        src={`/category/${category
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s*&\s*/g,
                                                                "-"
                                                            )
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                            .replace(
                                                                /open-source/i,
                                                                "opensource"
                                                            )}.svg`}
                                                        alt={category}
                                                        className="h-8 w-auto"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-12 border-t border-[#ffffff1a] relative z-40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 ml-8">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdei0unhm8Lc4h/img/vector.svg)] bg-[100%_100%]" />
                                <span className="[font-family:'TWK_Everett-Medium',Helvetica] text-xl font-medium text-white">
                                    Sui Directory
                                </span>
                            </div>
                            <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#e6ecffb2] text-base tracking-[-0.32px] leading-[25.6px]">
                                © Copyright 2025, Sui Foundation
                            </p>
                        </div>

                        <div className="ml-[550px] col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                {footerLinks.resources.map((link, index) => (
                                    <a
                                        key={`resource-${index}`}
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px] hover:text-[#e6ecffb2] transition-colors"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>

                            <div>
                                {footerLinks.company.map((link, index) => (
                                    <a
                                        key={`company-${index}`}
                                        href="#"
                                        className="block [font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] mb-[12px] hover:text-[#e6ecffb2] transition-colors"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Reels-style Overlay Player */}
            {activeVideo && (
                <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
                    {/* Close button */}
                    <button
                        onClick={closeOverlay}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        aria-label="Close"
                    >
                        <X className="text-white" />
                    </button>

                    {/* Reel container */}
                    <div
                        ref={reelRef}
                        className="relative w-[90vw] max-w-[430px] aspect-[9/16] rounded-[20px] overflow-hidden shadow-2xl"
                    >
                        {/* Mux Player */}
                        <MuxPlayer
                            style={
                                {
                                    width: "100%",
                                    height: "100%",
                                    "--controls": "none",
                                    "--media-object-size": "cover",
                                    "--controls-backdrop-color":
                                        "rgba(0,0,0,0)",
                                } as React.CSSProperties
                            }
                            playbackId={activeVideo.playbackId}
                            muted={isMuted}
                            autoPlay="muted"
                            loop
                            preload="auto"
                            title={activeVideo.title}
                            metadata={activeMetadata as any}
                            paused={paused}
                        />

                        {/* Click-to-play/pause layer */}
                        <button
                            aria-label="Toggle play"
                            onClick={togglePaused}
                            className="absolute inset-0 w-full h-full cursor-pointer"
                            style={{ background: "transparent" }}
                        />

                        {/* Bottom overlay with left info and right controls aligned */}
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                            <div className="pointer-events-auto flex items-end justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-white text-lg font-medium truncate">
                                        {activeVideo.title}
                                    </h3>
                                    {activeVideo.description && (
                                        <p className="text-white/80 text-sm line-clamp-3">
                                            {activeVideo.description}
                                        </p>
                                    )}
                                    {/* Categories with SVGs */}
                                    <div className="flex gap-3 mt-3 flex-wrap items-center">
                                        {activeVideo.categories?.map(
                                            (category, index) => (
                                                <img
                                                    key={`${category}-${index}`}
                                                    src={`/category/${category
                                                        .toLowerCase()
                                                        .replace(
                                                            /\s*&\s*/g,
                                                            "-"
                                                        )
                                                        .replace(/\s+/g, "-")
                                                        .replace(
                                                            /open-source/i,
                                                            "opensource"
                                                        )}.svg`}
                                                    alt={category}
                                                    className="h-9 sm:h-10"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end">
                                    <button
                                        onClick={toggleMute}
                                        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center"
                                        aria-label="Toggle mute"
                                    >
                                        <Volume2 className="text-white" />
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center"
                                        aria-label="Toggle fullscreen"
                                    >
                                        {document.fullscreenElement ? (
                                            <Minimize2 className="text-white" />
                                        ) : (
                                            <Maximize2 className="text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side external links OUTSIDE the player */}
                    <div className="ml-4 flex flex-col items-center gap-5">
                        {/* Website */}
                        {activeProject?.website && (
                            <a
                                href={activeProject.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                aria-label="Project website"
                            >
                                <img
                                    src="/video/internet-icon.svg"
                                    alt="website"
                                    className="w-12 h-12"
                                />
                            </a>
                        )}
                        {/* Twitter */}
                        {activeProject?.socialLinks?.twitter && (
                            <a
                                href={activeProject.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                aria-label="Project Twitter"
                            >
                                <img
                                    src="/video/twitter-icon.svg"
                                    alt="twitter"
                                    className="w-12 h-12"
                                />
                            </a>
                        )}
                        {/* Share current link */}
                        <a
                            href={`${window.location.origin}${window.location.pathname}?video=${activeVideo.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            aria-label="Share video link"
                        >
                            <img
                                src="/video/share-icon.svg"
                                alt="share"
                                className="w-12 h-12"
                            />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
