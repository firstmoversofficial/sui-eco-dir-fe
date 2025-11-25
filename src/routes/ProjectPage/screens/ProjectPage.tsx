import { Star, GitFork, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { FrontendAPI, Project } from "../../../lib/utils";

export const ProjectPage = (): JSX.Element => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [githubStats, setGithubStats] = useState<{
        stargazers_count: number;
        forks_count: number;
        open_issues_count: number;
    } | null>(null);
    const [githubError, setGithubError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            if (!projectId) return;
            setLoading(true);
            setError(null);
            try {
                const [projRes] = await Promise.all([
                    FrontendAPI.getProjectById(projectId),
                ]);
                if (!cancelled) {
                    const proj = projRes.data || null;
                    setProject(proj);

                    // Fetch GitHub stats if open source and repo URL is provided
                    if (
                        proj?.isOpenSource &&
                        proj.githubUrl &&
                        typeof proj.githubUrl === "string"
                    ) {
                        const repoPath = (() => {
                            try {
                                const u = new URL(proj.githubUrl as string);
                                if (!u.hostname.includes("github.com"))
                                    return null;
                                const parts = u.pathname
                                    .split("/")
                                    .filter(Boolean);
                                if (parts.length >= 2) {
                                    return `${parts[0]}/${parts[1]}`;
                                }
                                return null;
                            } catch {
                                return null;
                            }
                        })();

                        if (repoPath) {
                            fetch(`https://api.github.com/repos/${repoPath}`)
                                .then((r) => r.json())
                                .then((json: any) => {
                                    if (
                                        typeof json?.stargazers_count ===
                                        "number"
                                    ) {
                                        setGithubStats({
                                            stargazers_count:
                                                json.stargazers_count,
                                            forks_count: json.forks_count ?? 0,
                                            open_issues_count:
                                                json.open_issues_count ?? 0,
                                        });
                                    } else if (json?.message) {
                                        setGithubError(json.message);
                                    }
                                })
                                .catch(() =>
                                    setGithubError(
                                        "Failed to fetch GitHub statistics"
                                    )
                                );
                        }
                    }
                }
            } catch (e: any) {
                if (!cancelled) setError(e.message || "Failed to load project");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, [projectId]);

    const socialButtons = [
        {
            key: "website",
            icon: "/socials/website.svg",
            href: project?.website || project?.socialLinks?.website || null,
        },
        {
            key: "github",
            icon: "/socials/github.svg",
            href: project?.socialLinks?.github || project?.githubUrl || null,
        },
        {
            key: "x",
            icon: "/socials/x.svg",
            href: project?.socialLinks?.twitter || null,
        },
        {
            key: "discord",
            icon: "/socials/discord.svg",
            href: project?.socialLinks?.discord || null,
        },
        {
            key: "telegram",
            icon: "/socials/telegram.svg",
            href: project?.socialLinks?.telegram || null,
        },
    ] as const;

    const dashboardScreenshots = (project?.images || [])
        .slice(0, 4)
        .map((url) => ({ backgroundUrl: url }));

    // Footer links data
    const footerLinks = [
        { text: "Docs" },
        { text: "Developer Portal" },
        { text: "Media Kit" },
        { text: "Mysten Labs" },
        { text: "Privacy Policy" },
    ];

    // Key features list
    // Placeholder reserved for future feature listing if needed

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading project...
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
                {error}
            </div>
        );
    }

    return (
        <div className="relative w-full min-w-full bg-[#000000] overflow-hidden flex flex-col">
            {/* Hero Section with controlled height */}
            <div className="relative w-full min-w-full">
                {/* Background grid - fixed height instead of full screen */}
                <div className="bg-grid-container h-[600px] relative">
                    <img
                        className="w-full h-full object-cover object-top"
                        alt="Background grid"
                        src="/bg-grid.svg"
                    />
                </div>

                {/* Blur mask overlay */}
                <div className="blur-mask-container absolute top-0 left-0 w-full h-full">
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
                            <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdhad6w5lox3FE/img/vector.svg)] bg-[100%_100%]" />
                            <h1 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl tracking-[0] leading-[normal]">
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

                    {/* Project Content */}
                    <div className="px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Left Column - Project Info */}
                                <div className="space-y-6">
                                    {/* Project Logo */}
                                    <div className="inline-flex flex-col items-start">
                                        <div className="inline-flex items-center justify-center p-[1.5px] relative flex-[0_0_auto] rounded-lg overflow-hidden">
                                            <div className="absolute w-[52px] h-[52px] top-0 left-0 rounded-lg bg-[linear-gradient(302deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)]" />
                                            <div className="w-[52px] h-[52px] rounded-lg bg-[linear-gradient(139deg,rgba(77,162,255,1)_0%,rgba(77,162,255,0)_25%)] absolute top-0 left-0" />
                                            <div className="inline-flex items-center justify-center p-2.5 relative flex-[0_0_auto] bg-black rounded-lg">
                                                <div
                                                    className="relative w-[29px] h-[29px] bg-cover bg-[50%_50%]"
                                                    style={{
                                                        backgroundImage: `url(${
                                                            project?.logo || ""
                                                        })`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Title */}
                                    <h2 className="bg-[linear-gradient(176deg,rgba(255,255,255,1)_0%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-transparent text-4xl md:text-5xl lg:text-[64px] tracking-[0] leading-[normal]">
                                        {project?.name || "Project"}
                                    </h2>

                                    {/* Project Description */}
                                    <p className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecffb2] text-lg md:text-xl tracking-[0.20px] leading-[normal] max-w-lg">
                                        {project?.tagline ||
                                            project?.description ||
                                            ""}
                                    </p>

                                    {/* Social Media Links */}
                                    <div className="flex items-center gap-4 md:gap-6">
                                        {socialButtons
                                            .filter((btn) => !!btn.href)
                                            .map((btn) => (
                                                <a
                                                    key={btn.key}
                                                    href={btn.href as string}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-white/10"
                                                    aria-label={btn.key}
                                                >
                                                    <img
                                                        src={btn.icon}
                                                        alt={btn.key}
                                                        className="w-6 h-6"
                                                    />
                                                </a>
                                            ))}
                                    </div>

                                    {/* Bounty CTA */}
                                    {project?.isOpenForBounty &&
                                        project?.bountySubmissionUrl && (
                                            <div className="mt-6">
                                                <Button
                                                    className="bg-transparent hover:bg-[#ffffff1a] text-white border border-[#ffffff1a] rounded-full h-[50px] px-6 sm:px-8"
                                                    variant="outline"
                                                    onClick={() =>
                                                        window.open(
                                                            project.bountySubmissionUrl as string,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base">
                                                        Apply for Bounty Video
                                                    </span>
                                                </Button>
                                            </div>
                                        )}
                                </div>

                                {/* Right Column - Project Video/Image */}
                                <div
                                    className="relative w-full max-w-[500px] h-[355px] rounded-[20px] overflow-hidden mx-auto lg:mx-0"
                                    style={{
                                        background: project?.heroImage
                                            ? `url(${project.heroImage}) 50% 50% / cover`
                                            : undefined,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Screenshots Section - Fixed spacing */}
            <section className="relative px-4 sm:px-6 lg:px-10 py-8 mt-12 z-80">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dashboardScreenshots.map((screenshot, index) => (
                            <div
                                key={`screenshot-${index}`}
                                className="w-full h-[232px] rounded-[20px] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${screenshot.backgroundUrl})`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative px-4 sm:px-6 lg:px-10 py-16">
                <div className="max-w-7xl mx-auto">
                    <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-2xl md:text-[32px] tracking-[0.32px] leading-[normal] mb-8">
                        More About{" "}
                        {project?.name ? `{${project.name}}` : "Project"}
                    </h3>

                    <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-[#e6ecffb2] text-base md:text-lg tracking-[0.18px] leading-[normal] max-w-4xl space-y-6">
                        <p>{project?.description}</p>
                    </div>
                </div>
            </section>

            {/* Open Source Resources Section */}
            {project?.isOpenSource && project?.githubUrl && (
                <section className="relative px-4 sm:px-6 lg:px-10 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-2xl md:text-[32px] tracking-[0.32px] leading-[normal] mb-6">
                            Open Source Resources
                        </h3>
                        {githubError && (
                            <div className="text-red-400 text-sm mb-4">
                                {githubError}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3 bg-[radial-gradient(50%_50%_at_13%_4%,rgba(18,20,38,0.6)_0%,rgba(0,0,0,0.6)_100%)] rounded-xl px-4 py-3 border border-[#ffffff1a]">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <div className="text-white">
                                    <div className="text-sm opacity-70">
                                        GitHub Stars
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {githubStats?.stargazers_count ?? "—"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-[radial-gradient(50%_50%_at_13%_4%,rgba(18,20,38,0.6)_0%,rgba(0,0,0,0.6)_100%)] rounded-xl px-4 py-3 border border-[#ffffff1a]">
                                <GitFork className="w-5 h-5 text-blue-400" />
                                <div className="text-white">
                                    <div className="text-sm opacity-70">
                                        Forks
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {githubStats?.forks_count ?? "—"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-[radial-gradient(50%_50%_at_13%_4%,rgba(18,20,38,0.6)_0%,rgba(0,0,0,0.6)_100%)] rounded-xl px-4 py-3 border border-[#ffffff1a]">
                                <AlertCircle className="w-5 h-5 text-green-400" />
                                <div className="text-white">
                                    <div className="text-sm opacity-70">
                                        Open Issues
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {githubStats?.open_issues_count ?? "—"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Careers Section */}
            {project?.isHiring && (
                <section className="relative px-4 sm:px-6 lg:px-10 py-16">
                    {/* Background blur mask for careers section */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            alt="Careers blur mask"
                            src="/blur-mask-cr.svg"
                        />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className="relative">
                            <div className="flex justify-center">
                                <Card className="flex flex-col max-w-2xl w-full items-center justify-center gap-8 p-8 bg-transparent border-none">
                                    <div className="text-center space-y-6">
                                        <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-3xl md:text-[44px] tracking-[-0.44px] leading-[52.8px]">
                                            Grow With {project?.name}
                                        </h3>

                                        <div className="max-w-md mx-auto">
                                            <p className="[font-family:'Inter',Helvetica] font-normal text-[#e6ecffb2] text-base text-center tracking-[-0.32px] leading-[25.6px]">
                                                {project?.name} is currently
                                                looking out for talent
                                            </p>
                                            <p className="[font-family:'Inter',Helvetica] font-normal text-[#e6ecffb2] text-base text-center tracking-[-0.32px] leading-[25.6px] mt-2">
                                                Look out for their job postings.
                                            </p>
                                        </div>

                                        <div className="flex justify-center">
                                            <Button
                                                variant="outline"
                                                className="bg-transparent hover:bg-[#ffffff1a] text-white border border-[#ffffff1a] rounded-full h-[50px] px-6 sm:px-8"
                                                onClick={() =>
                                                    project?.careerPageUrl &&
                                                    window.open(
                                                        project.careerPageUrl,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_9%,rgba(255,255,255,0.3)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Satoshi-Medium',Helvetica] font-medium text-transparent text-base">
                                                    Find Careers
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="w-full h-px mt-8 [background:radial-gradient(50%_50%_at_50%_50%,rgba(138,165,255,1)_0%,rgba(0,0,0,1)_100%)] opacity-[0.14]" />
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="relative px-4 sm:px-6 lg:px-10 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Logo and Copyright */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-[25px] bg-[url(https://c.animaapp.com/mdhad6w5lox3FE/img/vector.svg)] bg-[100%_100%]" />
                                <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl tracking-[0] leading-[normal]">
                                    Sui Directory
                                </div>
                            </div>
                            <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#e6ecffb2] text-base tracking-[-0.32px] leading-[25.6px]">
                                © Copyright 2025, Sui Foundation
                            </p>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-3">
                            {footerLinks.slice(0, 3).map((link, index) => (
                                <div
                                    key={`footer-link-${index}`}
                                    className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] cursor-pointer hover:text-[#e6ecffb2] transition-colors"
                                >
                                    {link.text}
                                </div>
                            ))}
                        </div>

                        {/* Company Links */}
                        <div className="space-y-3">
                            {footerLinks.slice(3).map((link, index) => (
                                <div
                                    key={`footer-link-${index + 3}`}
                                    className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-[25.6px] cursor-pointer hover:text-[#e6ecffb2] transition-colors"
                                >
                                    {link.text}
                                </div>
                            ))}
                            <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-transparent text-base tracking-[-0.05px] leading-[25.6px] pt-4">
                                <span className="text-[#e6ecffb2] tracking-[-0.05px]">
                                    Designed with ❤ by{" "}
                                </span>
                                <span className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white tracking-[-0.05px]">
                                    @ParryDesigns
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator className="w-full h-px mt-8" />
                </div>
            </footer>
        </div>
    );
};
