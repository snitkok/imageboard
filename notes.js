// v-if v-else cannot stand alone

const { ManagedUpload } = require("aws-sdk/clients/s3");

// inside method 
setFile(e){
this.file = e.target.files[0];
},
upload(){
const formData = new FormData();
formData.append('file', this.file);
formData.append('file', this.title);
formData.append('file', this.desc);
fetch('/upload.json', {
    method: 'POST',
    body: formData
});
}

//inside html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<body>
    <div id="main">
        <input v-model="title" name="title">
        <input name="username">
        <input
            name="file"
            type="file"
            accept="image/*"
            @change="setFile"
        >
        <button v-on:click="upload"></button>
        <div v-for="image in images">
            <img :src="image.url" :alt="image.title">
        </div>
    </div>
    <script src="/js/app.js" type="module" crossorigin="use-credentials"></script>
</body>
</html>
</body>
</html>





//Node stuff goes to server.js


app.post('/upload', uploader.single('file'), function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    if (req.file) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});


{/* 
export default{
    data(){
        return{
            title:'',
            desc: '',
            username: ''
    }
        
    },
    props['id'],
    mounted(){
        fetch(`./image/${this.id}`).then(
            res => res.json().then()
        )
    }
}


//closeevent @close="closemodal"









*/}

