import fs from 'fs';

import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import generateDescriptionWithGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
    const postsResults = await getAllPosts();
    res.status(200).json(postsResults);
}

export async function makeNewPost(req, res) {
    const newPost = req.body;
    try
    {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error" : "Requisition failure"});
    }
}

export async function imgUpload(req, res) {
    const newImage = {
        description: "",
        imgUrl: req.file.originalname,
        altText: ""
    };

    try
    {
        const createdImg = await createPost(newImage);
        const updatedImg = `uploads/${createdImg.insertedId}.png`;  //Hardcoded for now. Implement other extensions later.
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(createdImg);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error" : "Requisition failure"});
    }
}

export async function updateThisPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`;       //Because of static serving of upload directory.
    try
    {
        //Description being generated by Google Gemini API
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const postUpdate = {
            imgURL: imgUrl,
            description: description,
            altText: req.body.altText
        }
        
        const updatedPost = await updatePost(id, postUpdate);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error" : "Requisition failure"});
    }
}