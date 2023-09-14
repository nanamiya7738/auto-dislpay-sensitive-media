'use strict';

const quarySensitiveMedia = "div.css-1dbjc4n.r-1awozwy.r-g6ijar.r-cliqr8.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1wtj0ep.r-mzo9nz.r-1w50u8q div.css-18t94o4.css-1dbjc4n.r-1niwhzg.r-sdzlij.r-1phboty.r-rs99b7.r-1bn9qdh.r-ntnk74.r-1ny4l3l.r-779j7e.r-1hfyk0a.r-1qfoi16.r-o7ynqc.r-6416eg.r-lrvibr";
const quarySensitiveContent = "div.css-1dbjc4n.r-1867qdf.r-16y2uox.r-l3hqri.r-1udh08x div.css-18t94o4.css-1dbjc4n.r-173mn98.r-sdzlij.r-1phboty.r-rs99b7.r-156q2ks.r-1bn9qdh.r-ntnk74.r-1ny4l3l.r-779j7e.r-o7ynqc.r-6416eg.r-lrvibr";
// const quaryTimeline = "section.css-1dbjc4n.r-18u37iz.r-2llsf.r-1ny4l3l div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-11yh6sk.r-1rnoaur.r-u8s1d.r-zchlnj.r-1bzj12m.r-ipm5af";

function displaySensitiveMedia() {
    var buttonsSensitiveMedia = document.querySelectorAll(quarySensitiveMedia);
    buttonsSensitiveMedia.forEach(val => {
        val.click();
    });

    var buttonsSensitiveContent = document.querySelectorAll(quarySensitiveContent);
    buttonsSensitiveContent.forEach(val => {
        val.click();
    });
};

window.addEventListener("load", () => {
    setInterval(() => {
        console.log("check");
        displaySensitiveMedia();
    }, 1000);
});

