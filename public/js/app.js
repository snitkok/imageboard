import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: null,
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
}).mount("#main");
