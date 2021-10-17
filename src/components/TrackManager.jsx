import { Button, Col, Container, Row } from "react-bootstrap";
import React from "react";

import AudioTrack from "./AudioTrack";

const nextTrackId = (function (){
    let freshId = 0;
    return () => freshId++;
})();

export default function TrackManager() {
    const [tracks, setTracks] = React.useState([]);

    const addTrack = () => {
        setTracks([...tracks, { id: nextTrackId() }]);
    };

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(({ id }) => id !== trackId));
    };

    return (
        <main>
        <Container>
            <h1>Tracks</h1>
            <Row xs={2} className="mb-3">
                {tracks.map(({ id }) => (
                    <Col key={id}>
                    <AudioTrack
                        removeTrack={() => removeTrack(id)}
                    />
                    </Col>
                ))}
            </Row>
            <Button onClick={addTrack}>Add Track</Button>
        </Container>
        </main>
    )
}