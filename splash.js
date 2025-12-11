window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("main-ui").classList.remove("hidden");
    }, 2500); // 2.5s splash
});