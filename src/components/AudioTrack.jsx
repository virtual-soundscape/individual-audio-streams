import React from "react";

import { Button, Card, Stack } from "react-bootstrap";

import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import useAudioFile from "../hooks/useAudioFile";


function AudioTrack_Loaded({ audio, removeTrack }) {
    const { name, file } = audio;
    const { pause, playState, volume } = useAudioFile(file);

    const handleVolumeSlider = ({ value, dragging, index, ...restProps }) => {
        volume.set(value / 100);
        return (
            <SliderTooltip
              prefixCls="rc-slider-tooltip"
              overlay={`${value}`}
              visible={dragging}
              placement="top"
              key={index}
            >
              <Slider.Handle value={value} {...restProps} />
            </SliderTooltip>
          );
    };

    return (
        <>
        <Card.Title>
            {name}
        </Card.Title>
        <Stack gap={3}>
            <Button
                variant={playState.value ? "secondary" : "success"}
                onClick={playState.toggle}
            >
                {playState.value ? "Pause" : "Play"}
            </Button>
            <Slider
                min={0}
                max={100}
                defaultValue={100}
                handle={handleVolumeSlider}
            />
            <Button
                variant="danger"
                onClick={() => {
                    pause();
                    removeTrack();
                }}
            >
                Delete
            </Button>
        </Stack>
        </>
    );
}

export default function AudioTrack({ removeTrack }) {
    const [audio, setAudio] = React.useState();

    const uploadAudio = (ev) => {
        const file = ev.target.files[0];
        if (!file) {
            return;
        }

        setAudio({
            name: file.name,
            file,
        });
    };
    
    return (
        <Card className="my-1">
            <Card.Body>
                {audio ?
                    <AudioTrack_Loaded
                        audio={audio}
                        removeTrack={removeTrack}
                    />
                :
                    <>
                    <Card.Title>
                        No Track Loaded
                    </Card.Title>
                    <input
                        type="file"
                        onChange={uploadAudio}
                        accept="audio/*"
                    />
                    </>
                }
            </Card.Body>
        </Card>
    );
}