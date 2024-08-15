import dynamic from "next/dynamic";

const PlayerSkeleton = () => {
    return <div className="player bg-skeleton-bg animate-pulse" style={{borderRadius: "8px"}}/>
}

const KinescopePlayer = dynamic(() => import('@kinescope/react-kinescope-player'), {
    ssr: false,
    loading: () => <PlayerSkeleton/>
});

export default function Player({title, videoId}: { title: string, videoId: string }) {
    return (
        <KinescopePlayer
            className="player"
            title={title}
            language="ru"
            videoId={videoId}
            playsInline={false}
        />
    )
}
