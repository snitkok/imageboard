export default {
    data() {
        return {
            comments: [],
            comment_text: "",
            username: "",
            created_at: "",
        };
    },
    props: ["imageId"],
    template: `

<h3>Leave your comment here</h3>
<input v-model="username" 
name="username" placeholder="username">
<input v-model="comment_text" placeholder="comment" name="comment"><br>
<button type="submit" v-on:click="submit">Submit</button>

<div v-if="comments" v-for="comment in comments" class="framed">
<h3>{{comment["comment_text"]}}</h3>
<div>{{comment.username}} on {{comment.date}}</div>
 </div>
    `,
    methods: {
        submit() {
            const commentsData = {
                comment_text: this.comment_text,
                username: this.username,
                image_id: this.imageId,
            };

            console.log("inside of submit()", commentsData);
            fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentsData),
            })
                .then((response) => response.json())
                .then((response) => {
                    this.comments.unshift(response);
                });
        },
    },
    mounted: function () {
        console.log("commmmmmment********************", this.imageId);
        fetch(`/comments/${this.imageId}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("comments from server:", data);
                // this.comment_text = data.comment_text;
                // this.username = data.username;
                // this.date = data.created_at;

                this.comments = data;
            });
    },
};
