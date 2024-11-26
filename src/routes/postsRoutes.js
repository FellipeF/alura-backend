import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listPosts, makeNewPost, imgUpload, updateThisPost } from '../controllers/postsController.js';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
//Windows config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb)
    {
        cb (null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage});

const routes = (app) => {
    //Parse text into JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/", (req, res) => {
        res.status(200).send("Welcome. This is your first route");
      });

    app.get("/posts", listPosts);

    app.post("/posts", makeNewPost);

    app.post("/upload", upload.single("image"), imgUpload);   //Multer middleware

    app.put("/upload/:id", updateThisPost);
}

export default routes;