// Wait 2.5 seconds then hide splash screen and show main UI
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("main-ui").classList.remove("hidden");
    }, 2500); // 2.5 seconds splash
});
