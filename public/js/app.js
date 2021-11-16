import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: null,
            title: "",
            desc: "",
            username: "",
            file: null,
        };
    },
    mounted: function () {
        console.log("vue app just mounted");
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
        },
        upload() {
            const formData = new FormData();
            formData.append("file", this.file);
            formData.append("title", this.title);
            formData.append("desc", this.desc);
            formData.append("username", this.username);
            fetch("/upload.json", {
                method: "POST",
                body: formData,
            })
                .then((data) => data.json())
                .then((data) => {
                    this.images.unshift(data);
                });
        },
    },
}).mount("#main");
