// React STT Tutorial: https://www.loginradius.com/blog/engineering/quick-look-at-react-speech-recognition/

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dialogue = () => {
    const [message, setMessage] = useState(""); // response

    // https://www.npmjs.com/package/react-speech-recognition
    // list of commands with callback
    const commands = [
        {
            command: ["*take*", "*Take*"],
            callback: () => setMessage("Found: Something")
        },

        {
            command: ["*help*", "*Help*"],
            callback: () => setMessage("This is a help message")
        }
    ];

    // fetch properties out of useSpeechRecognition
    const { 
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition({ commands }); // enable commands

    const receive = (msg) => {
        resetTranscript();
        if (msg !== "") {
            setMessage(msg);
        }
    }

    useEffect(() => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB'
        });
    }, []);

    // print out transcript
    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    // handel no speech recognition support
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log("ERREUR: Speech recognition not supported.")
        return null
    }

    return(
        <div>
            <div>
                Message: {message}
            </div>
            <div>
                <span>Said: {transcript}</span>
            </div>
        </div>
    );
};

export default Dialogue;
