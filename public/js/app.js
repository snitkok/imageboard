import * as Vue from "./vue.js";
import modal from "./modal.js";

// createApp returns an object with a mount method. You pass mount method a selector to tell Vue what element your UI will appear in.
Vue.createApp({
    // You can specify data you want to render in your UI by adding a data function to the object you pass to createApp.
    data() {
        return {
            images: null,
            title: "",
            description: "",
            username: "",
            file: null,
            open: false,
        };
    },
    // The keys of the object you set as the value of the components property will be recognized as the tag names of your components.
    components: {
        "my-modal": modal,
    },
    // lifecycle hooks - methods you can add to your Vue app that will automatically get called when the lifecycle event occurs. The mounted lifecycle hook runs when Vue has rendered for the first time.
    mounted: function () {
        console.log("vue app just mounted");
        // The fetch() method in JavaScript is used to request to the server and load the information in the webpages. The request can be of any APIs that returns the data of the format JSON or XML. This method returns a promise.
        fetch("/images.json")
            .then((data) => data.json())
            .then((data) => {
                console.log("images from server:", data);
                this.images = data;
            });
    },
    updated: function () {
        console.log("vue just updated");
    },
    methods: {
        setFile(e) {
            this.file = e.target.files[0];
            //file the user has specified in the form
        },
        upload() {
            // The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values.
            const formData = new FormData();
            formData.append("file", this.file);
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            // sending the FormData instance in a POST request.
            fetch("/upload.json", {
                method: "POST",
                body: formData,
            })
                .then((data) => data.json())
                .then((data) => {
                    // adding the img object to the existing array of images
                    this.images.unshift(data);
                });
        },

        closeModal() {
            this.open = false;
            this.selectedImageId = undefined;
        },

        openModal(imgId) {
            console.log("openmodal!!!!!!!!!!!", imgId);
            this.open = true;
            this.selectedImageId = imgId;
        },
    },
}).mount("#main");
