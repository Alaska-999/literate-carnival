import { HTMLAttributes, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import secretMusic from "../assets/secret.mp3"; // Update the path to your music file
import secretImage from "../assets/secret.png";

const FlyingSecret = () => {
	const [isSecretRunning, setIsSecretRunning] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handleSecretButtonClick = () => {
		setIsSecretRunning(true);
		if (audioRef.current) {
			audioRef.current.play();
		}
		setTimeout(() => {
			setIsSecretRunning(false);
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
		}, 25000);
	};

	return (
		<Container isSecretRunning={isSecretRunning}>
			<SecretButton onClick={handleSecretButtonClick}>Click me</SecretButton>
			{isSecretRunning && <Secret src={secretImage} />}
			<audio
				ref={audioRef}
				src={secretMusic}
			/>
		</Container>
	);
};

const flyAndRotate = keyframes`
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(1100px, -400px) rotate(1500deg);
    }
    50% {
        transform: translate(100px, -100px) rotate(-600deg);
    }
    75% {
        transform: translate(900px, 500px) rotate(670deg);
    }

    85% {
        transform: translate(900px, -300px) rotate(-370deg);
    }
    100% {
        transform: translate(0, 0) rotate(800deg);
    }
`;

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	isSecretRunning: boolean;
}

const Container = styled.div<ContainerProps>`
	background: transparent;
	outline: none;
`;

const SecretButton = styled.button`
	position: absolute;
	bottom: 50px;
	right: 50px;
	font-size: 18px;
	padding: 20px;
	&:focus {
		outline: none;
	}
`;

const Secret = styled.img`
	width: 350px;
	position: absolute;
	animation: ${flyAndRotate} 10s linear infinite;
`;

export default FlyingSecret;
