import { postService } from "../services/post.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { POST_FIELDS } from "../const/allowedFields.js";

class PostController {
    async getAllPosts(req, res) {
        try {
            const allPosts = await postService.getAllPosts();
            res.status(200).json({ posts: allPosts });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async getPostById(req, res) {
        try {
            const postId = req.params.postId;
            const post = await postService.getPostById(postId);
            res.status(200).json({ post: post });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async createAPost(req, res) {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const newPost = await postService.createAPost(data);
            res.status(201).json({ newPost: newPost });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async updateAPostById(req, res) {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const postId = req.params.postId;
            const updatedPost = await postService.updateAPostById(postId, data);
            res.status(200).json({ updatedPost: updatedPost });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async deleteAPostById(req, res) {
        try {
            const postId = req.params.postId;
            const deletedPost = await postService.deleteAPostById(postId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export const postController = new PostController();
