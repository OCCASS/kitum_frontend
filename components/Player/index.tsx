import { useEffect, useState } from 'react';
import KinescopePlayer from "@kinescope/react-kinescope-player"

export const PlayerSkeleton = () => {
    return <div className="player bg-skeleton-bg animate-pulse" style={{ borderRadius: "8px" }} />
}

function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}

export default function Player({ title, videoId }: { title: string, videoId: string }) {
    const isMounded = useHasMounted()

    if (!isMounded) return <PlayerSkeleton />

    return (
        <KinescopePlayer
            className="player"
            title={title}
            language="ru"
            videoId={videoId}
            playsInline={false}
            preload={true}
        />
    )
}
