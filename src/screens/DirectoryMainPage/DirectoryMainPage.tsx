import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { AllProjectsSection } from "./sections/AllProjectsSection";
import { FeaturedProjectsSection } from "./sections/FeaturedProjectsSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { Category, FrontendAPI } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export const DirectoryMainPage = (): JSX.Element => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;
        async function run() {
            try {
                const res = await FrontendAPI.listCategories();
                if (!cancelled) setCategories(res.data || []);
            } catch {
                // ignore for landing render; category bar can be empty
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, []);

    const toggleCategory = (name: string) => {
        setSelectedCategories((prev) =>
            prev.includes(name)
                ? prev.filter((c) => c !== name)
                : [...prev, name]
        );
    };

    const handleExploreVideos = () => {
        navigate("/videos");
    };

    return (
        <div
            className="relative w-full min-w-full bg-[#000000] overflow-hidden flex flex-col min-h-screen"
            data-model-id="1:2"
        >
            {/* Background grid - now covers entire page */}
            <div className="absolute top-0 left-0 w-full min-h-full z-10">
                <img
                    className="w-full h-full object-cover object-top"
                    alt="Background grid"
                    src="/bg-grid.svg"
                />
            </div>

            {/* Blur mask overlay - fixed size without animation */}
            <div className="absolute top-0 left-0 w-full h-[1400px] z-20 overflow-hidden pointer-events-none">
                <img
                    className="w-full h-full object-cover"
                    alt="Blur mask"
                    src="/blur-mask.svg"
                />
            </div>

            {/* All content is now relative to the main container */}
            <div className="relative z-30 flex flex-col min-h-screen">
                <MainContentSection />

                {/* Hero section with title and subtitle */}
                <div
                    className="flex flex-col items-center mt-8 sm:mt-16 md:mt-20 
                lg:mt-32 px-4 sm:px-6 lg:px-8"
                >
                    <h1 className="w-full max-w-[645px] bg-[linear-gradient(175deg,rgba(255,255,255,1)_0%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-center leading-normal">
                        Hottest Sui Projects Under One Roof
                    </h1>

                    <p className="w-full max-w-[559px] mt-6 sm:mt-8 lg:mt-[30px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecffb2] text-lg sm:text-xl text-center tracking-[0.20px] leading-normal px-4">
                        No more hunting through random threads and Discords.
                        Just the best Sui projects, ready to be explored.
                    </p>

                    <Button
                        className="mt-8 sm:mt-12 md:mt-16 lg:mt-[67px] bg-transparent hover:bg-[#ffffff1a] text-white border border-[#ffffff1a] rounded-full h-[50px] px-6 sm:px-8"
                        variant="outline"
                        onClick={handleExploreVideos}
                    >
                        <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-sm sm:text-base">
                            Explore Videos
                        </span>
                    </Button>
                </div>

                {/* Added significant spacing between button and Featured Projects */}
                <div className="h-20 sm:h-24 lg:h-32"></div>

                {/* Featured Projects section */}
                <div className="relative z-30">
                    <div className="px-4 sm:px-6 lg:px-10 mb-14 sm:mb-16">
                        <h2 className="text-center [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[0.32px] leading-normal">
                            Featured Projects
                        </h2>
                    </div>
                    <HeroSection />
                </div>

                {/* All Projects section header */}
                <div className="flex flex-col mt-16 sm:mt-20 lg:mt-24 relative z-40">
                    <div className="px-4 sm:px-6 lg:px-10">
                        <h2 className="text-center [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[0.32px] leading-normal">
                            All Projects
                        </h2>
                    </div>
                </div>

                {/* Filter by Categories section */}
                <div className="px-4 sm:px-6 lg:px-10 mt-6 sm:mt-8 lg:mt-[35px] relative z-40">
                    <p className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecff] text-base tracking-[0.16px] leading-normal ml-4 sm:ml-6 lg:ml-8">
                        Filter by Categories
                    </p>

                    {/* Category Filter Bar */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-[30px] ml-4 sm:ml-6 lg:ml-8 mb-8 sm:mb-12 lg:mb-16">
                        {categories.map((cat) => {
                            const isSelected = selectedCategories.includes(
                                cat.name
                            );
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleCategory(cat.name)}
                                    className={`transition-transform duration-200 scale-105 hover:scale-110 rounded-full border ${
                                        isSelected
                                            ? "border-[#4DA2FF] bg-[#4DA2FF]/10"
                                            : "border-[#ffffff1a] bg-transparent"
                                    }`}
                                    title={cat.name}
                                >
                                    <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`public${cat.icon}`}
                                            alt={cat.name}
                                            className="h-full w-auto object-contain border-none outline-none"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Project sections */}
                <AllProjectsSection selectedCategories={selectedCategories} />
                <FeaturedProjectsSection />
            </div>
        </div>
    );
};
