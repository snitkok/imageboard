import comments from "./comments.js";

// creating our modal component here
export default {
    data() {
        return {
            modalImg: null,
            title: "",
            description: "",
            username: "",
            url: "",
            date: "",
            next: null,
            previous: null,
            showNextImg: true,
            showPreviousImg: true,
        };
    },
    components: {
        "my-comments": comments,
    },

    props: ["id"],

    template: `
    <div id="modal">
    <div id="modal-content">
    <a @click="nextImg" class="next" v-if="showNextImg">&laquo; Next</a>  
    <img :src="modalImg" >
   <a @click="previousImg" class="previous" v-if="showPreviousImg"> Previous &raquo;</a>
    <h1>{{title}}</h1> 
    <div>{{description}}</div>
    <div> Uploaded by {{username}} on {{date}} </div> 
    <button @click="click">Close</button>
        <my-comments :image-id="id"></my-comments> 
    </div>
    </div>
    
    <div id="modal-overlay" @click="click"></div>
    `,
    watch: {
        id() {
            this.selectImageById(this.id);
        },
    },
    methods: {
        click: function () {
            this.$emit("close");
        },
        previousImg: function () {
            this.$emit("previous", this.previous);
            console.log("previousImg was clicked", this.previous);
        },
        nextImg: function () {
            this.$emit("next", this.next);
            console.log("nextImg was clicked", this.next);
        },

        selectImageById: function (id) {
            console.log("image by id", id);
            fetch(`/modal/${this.id}`)
                .then((data) => data.json())
                .then((data) => {
                    if (data === null) {
                        this.$emit("close", "done");
                    }
                    this.modalImg = data.url;
                    this.title = data.title;
                    this.description = data.description;
                    this.username = data.username;
                    this.next = data.next;
                    this.previous = data.previous;

                    if (!this.next) {
                        this.showNextImg = false;
                    } else {
                        this.showNextImg = true;
                    }
                    if (!this.previous) {
                        this.showPreviousImg = false;
                    } else {
                        this.showPreviousImg = true;
                    }

                    //dates
                    let createdAt = data.created_at;
                    let createdAtFormatted = new Date(createdAt);
                    this.date = `${createdAtFormatted.toLocaleDateString(
                        "de-DE",
                        {
                            year: "numeric",
                            day: "numeric",
                            month: "long",
                        }
                    )}`;

                    console.log(
                        "@##@#@@###@###@##@###@",
                        this.next,
                        this.previous
                    );
                });
        },
    },
    mounted: function () {
        this.selectImageById(this.id);
    },
};
