import React from "react";

export default function useAudioFile(file) {
    const [isPlaying, setPlaying] = React.useState(false);

    const audio = React.useMemo(
        () => new Audio(URL.createObjectURL(file)),
        [file]
    );

    const play = () => {
        audio.play();
        setPlaying(true);
    };

    const pause = () => {
        audio.pause();
        setPlaying(false);
    };

    return {
        volume: {
            value: audio.volume,
            set: (volume) => {
                audio.volume = volume;
            },
        },
        play,
        pause,
        playState: {
            value: isPlaying,
            toggle: () => {
                isPlaying ? pause() : play();
            },
        },
    };
}
