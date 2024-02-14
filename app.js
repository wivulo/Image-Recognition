const selectFile = document.querySelector("#file");
const start = document.querySelector("#start");
const selectedImage = document.querySelector("#image");
const progress1 = document.querySelector("#progress1");
const progress2 = document.querySelector("#progress2");
const progress3 = document.querySelector("#progress3");
const progress4 = document.querySelector("#progress4");
const progress5 = document.querySelector("#progress5");
const textInImage = document.querySelector("#text");

selectFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    let imageURL = window.URL.createObjectURL(new Blob([file], { type: "image/jpeg" }));
    selectedImage.src = imageURL;
});


start.addEventListener("click", async () => {
    textInImage.innerHTML = "";
    const worker = await Tesseract.createWorker("por", 1, {
        logger: m => {

            if(m.status === "loading tesseract core") {
                progress1.value = m.progress;

                m.progress === 1 && (progress1.value = 1)
            }


            if(m.status === "initializing tesseract") {
                progress2.value = m.progress;

                m.progress === 1 && (progress2.value = 1)
            }


            if(m.status === "loading language traineddata") {
                progress3.value = m.progress;

                m.progress === 1 && (progress3.value = 1)
            }


            if(m.status === "initializing api") {
                progress4.value = m.progress;

                m.progress === 1 && (progress4.value = 1)
            }

            

            if(m.status === "recognizing text") {
                progress5.value = m.progress;

                m.progress === 1 && (progress5.value = 1)
            }

        },
    });

    let ret = await worker.recognize(selectFile.files[0]);
    textInImage.innerHTML = ret.data.text;
    await worker.terminate();
});