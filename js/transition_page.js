
export function transition_start(){
    const transitionVideo = document.getElementById('transition-video');
    console.log('Transition video element:', transitionVideo);
    let isPlaying = false;

    console.log('Animation out started');
    transitionVideo.currentTime = 0;
    transitionVideo.muted = false;
    transitionVideo.play().then(() => {
        isPlaying = true;
        console.log('Video playing with sound');
    }).catch((error) => {
        console.error('Error playing video:', error);
    });
}

export function transition_end(){

    const transitionVideo = document.getElementById('transition-video');
    console.log('Transition video element:', transitionVideo);


    transitionVideo.pause();
    transitionVideo.currentTime = 0;
    transitionVideo.muted = true;
    console.log('Video paused and muted');
}











