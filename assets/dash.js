/******************************************************************************/
/* DASH Video Player Control */
/******************************************************************************/

const DASHPlayer = MPDURL => {
    if (!MPDURL) return;

    const videoContainer = document.querySelector(".video-container");
    const videoElement = videoContainer.querySelector("video");
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoElement, MPDURL, false);

    const controlsContainer  = videoContainer.querySelector(".controls-container");
    const focusInput         = videoContainer.querySelector(".focus-input");
    const seekbarTrack       = videoContainer.querySelector(".seekbar-track");
    const seekbarBuffer      = videoContainer.querySelector(".seekbar-buffer");
    const seekbarThumb       = videoContainer.querySelector(".seekbar-thumb");
    const seekbarCursor      = videoContainer.querySelector(".seekbar-cursor");
    const thumbnailContainer = videoContainer.querySelector(".thumbnail-container");
    const thumbnailLabel     = videoContainer.querySelector(".thumbnail-label");
    const playButton         = videoContainer.querySelector(".play-button");
    const muteButton         = videoContainer.querySelector(".mute-button");
    const volumeSlider       = videoContainer.querySelector(".volume-slider");
    const timeDisplay        = videoContainer.querySelector(".video-time");
    const durationDisplay    = videoContainer.querySelector(".duration");
    const fullscreenButton   = videoContainer.querySelector(".fullscreen-button");

    let lastVolume = 0;
    let controlsVisibleTimeout;

    /**************************************************************************/
    /* Common Methods */
    /**************************************************************************/

    const toggleButtonIcon = (button, isForward, iconA, iconB) => {
        const span = button.querySelector("span"); 
        if (isForward) {
            span.classList.replace(iconA, iconB);
        } else {
            span.classList.replace(iconB, iconA);
        }
    };

    const togglePlayActively = () => {
        toggleButtonIcon(playButton, player.isPaused(), "fa-play", "fa-pause");
        player.isPaused() ? player.play() : player.pause();
    };

    const togglePlayPassively = () => {
        toggleButtonIcon(playButton, player.isPaused(), "fa-pause", "fa-play");
    };

    const setTimeDisplay = (display, time) => {
        display.textContent = player.convertToTimeCode(time);
    };

    const setSeekbarThumb = (thumb, offset) => {
        let left = offset;
        const maxLeft = seekbarTrack.clientWidth - thumb.clientWidth;
        left = left > maxLeft ? maxLeft : left;
        left = parseInt(left);
        thumb.style.left = left + "px";
    };

    const setTimePassively = () => {
        const t = player.time();
        setTimeDisplay(timeDisplay, t);

        let left = t / player.duration() * seekbarTrack.clientWidth;
        setSeekbarThumb(seekbarThumb, left);
    };

    const offsetToMouseTime = offset => {
        return offset / seekbarTrack.clientWidth * player.duration();
    }

    /**************************************************************************/
    /* Time, Duration, Seekbar */
    /**************************************************************************/

    player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
        setTimeDisplay(durationDisplay, player.duration());
    });

    player.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
        const dashMetrics = player.getDashMetrics();
        const bufferLevel = dashMetrics.getCurrentBufferLevel('video');
        seekbarBuffer.style.width = (player.time() + bufferLevel) / player.duration() * 100 + "%";
    });

    player.on(dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED, setTimePassively);

    /* Key Bindings */

    focusInput.focus();
    videoContainer.addEventListener("click", () => {
        focusInput.focus();
    });

    focusInput.addEventListener("keyup", event => {
        if (event.code === "Space") {
            togglePlayActively();
        } else if (event.code === "ArrowRight") {
            player.seek(player.time() + 5);
        } else if (event.code === "ArrowLeft") {
            player.seek(player.time() - 5);
        }
    });

    seekbarTrack.addEventListener("mouseup", event => {
        player.seek(offsetToMouseTime(event.offsetX));
        setTimePassively();
    });

    const thumbnailContainerWidth = parseInt(window.getComputedStyle(thumbnailContainer).width);
    seekbarTrack.addEventListener("mousemove", event => {
        if (!player.provideThumbnail) return;
        const mouseTime = offsetToMouseTime(event.offsetX);

        player.provideThumbnail(mouseTime, thumbnail => {
            if (!thumbnail) return;
            const minLeft = thumbnailContainerWidth / 2;

            let left = event.offsetX - minLeft;
            if (left < 0) {
                left = 0;
            } else if (minLeft > seekbarTrack.clientWidth - event.offsetX) {
                left = seekbarTrack.clientWidth - thumbnailContainerWidth;
            }
            left = parseInt(left);
            thumbnailContainer.style.left = left + "px";

            thumbnailContainer.style.width = thumbnail.width + "px";
            thumbnailContainer.style.height = thumbnail.height + "px";

            const scale = thumbnailContainerWidth / thumbnail.width;
            thumbnailContainer.style.transform = `scale(${scale})`;

            let backgroundStyle = `url("${thumbnail.url}")`;
            backgroundStyle += ` ${thumbnail.x > 0 ? "-" + thumbnail.x : "0"}px`;
            backgroundStyle += ` ${thumbnail.y > 0 ? "-" + thumbnail.y : "0"}px`;
            thumbnailContainer.style.background = backgroundStyle;

            thumbnailLabel.textContent = player.convertToTimeCode(mouseTime);
            thumbnailContainer.classList.remove("hidden");

            setSeekbarThumb(seekbarCursor, event.offsetX);
            seekbarCursor.classList.remove("hidden");
        });

    });

    seekbarTrack.addEventListener("mouseleave", () => {
        thumbnailContainer.classList.add("hidden");
        seekbarCursor.classList.add("hidden");
    });

    /* Play Pause */

    playButton.addEventListener("click", togglePlayActively);
    videoElement.addEventListener("click", togglePlayActively);

    const togglePlayButton = () => {
    };

    player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, togglePlayPassively);
    player.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, togglePlayPassively);

    /* Mute Button, Volume Slider */

    const setVolumePassively = () => {
        volumeSlider.value = player.isMuted() ? 0 : player.getVolume();
        toggleButtonIcon(muteButton, player.isMuted(), "fa-volume-high", "fa-volume-xmark");
    };

    const setVolumeActively = (value) => {
        const vol = typeof value === "number" ? value : parseFloat(volumeSlider.value);
        player.setVolume(vol);
        player.setMute(vol === 0);
        lastVolume = vol === 0 ? lastVolume : vol;
        setVolumePassively(vol);
    };

    muteButton.addEventListener("click", () => {
        if (player.isMuted()) {
            setVolumeActively(lastVolume);
        } else {
            lastVolume = parseFloat(volumeSlider.value);
            setVolumeActively(0);
        }
    });

    volumeSlider.addEventListener("input", setVolumeActively);

    player.on(dashjs.MediaPlayer.events.PLAYBACK_VOLUME_CHANGED, setVolumePassively);

    /* Fullscreen */

    const clearFullscreenState = () => {
        clearTimeout(controlsVisibleTimeout);
        controlsContainer.classList.remove("none");
    };

    const onFullscreenMousemove = () => {
        clearFullscreenState();
        controlsVisibleTimeout = setTimeout(() => {
            controlsContainer.classList.add("none");
        }, 3000);
    };

    const isFullscreen = () => {
        return document.fullscreenElement;
    };

    const onFullscreenChange = () => {
        const isFull = isFullscreen();
        toggleButtonIcon(fullscreenButton, isFull, "fa-expand", "fa-compress");

        if (isFull) {
            controlsContainer.classList.add("controls-fullscreen");
        } else {
            controlsContainer.classList.remove("controls-fullscreen");
            window.removeEventListener("mousemove", onFullscreenMousemove);
            clearFullscreenState();
        }

        setTimePassively();
    }

    fullscreenButton.addEventListener("click", () => {
        if (isFullscreen()) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
            window.addEventListener("mousemove", onFullscreenMousemove);
            onFullscreenMousemove();
        }
    });

    document.addEventListener("fullscreenchange", onFullscreenChange);

};
