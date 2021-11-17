export default {
    data() {
        return {
            modalImg: null,
            title: "",
            desc: "",
            username: "",
            url: "",
            date: "",
        };
    },
    props: ["id"],
    template: `
    <div id="modal">
    <div id="modal-content">
   <img :src="modalImg" >
    <h1>{{title}}</h1> 
    <div>{{desc}}</div>
    <div> Uploaded by {{username}} on {{date}} </div> 
    <button @click="click">Close</button>
    </div>
    </div>
    <div id="modal-overlay" @click="click"></div>
    `,
    methods: {
        click: function () {
            this.$emit("close");
        },
    },
    mounted: function () {
        console.log("image by id");
        fetch(`/modal/${this.id}`)
            .then((data) => data.json())
            .then((data) => {
                this.modalImg = data.url;
                this.title = data.title;
                this.desc = data.description;
                this.username = data.username;
                let createdAt = data.created_at;
                let createdAtFormatted = new Date(createdAt);

                this.date = `${createdAtFormatted.toLocaleDateString("de-DE", {
                    year: "numeric",
                    day: "numeric",
                    month: "long",
                })}`;

                console.log("images from server:", data);
            });
    },
};
