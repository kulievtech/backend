import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class PostService {
    async readFile() {
        try {
            const postsObj = await fs.readFile("posts.json", "utf-8");
            const parsedData = JSON.parse(postsObj);
            return parsedData.posts;
        } catch (error) {
            return error;
        }
    }
    async writefile(data) {
        try {
            const result = await fs.writeFile(
                "posts.json",
                JSON.stringify({ posts: data })
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    async getAllPosts() {
        const result = await this.readFile();
        return result;
    }

    async getPostById(postId) {
        try {
            const postsObj = await this.readFile();
            const result = postsObj[postId];
            return result;
        } catch (error) {
            return error;
        }
    }

    async createAPost(data) {
        try {
            const postsObj = await this.readFile();
            const id = uuid();
            const newPost = {
                id,
                ...data
            };

            postsObj[id] = newPost;

            await this.writefile(postsObj);
            return newPost;
        } catch (error) {
            return error;
        }
    }

    async updateAPostById(postId, data) {
        try {
            const postsObj = await this.readFile();

            if (postsObj.hasOwnProperty(postId)) {
                const updatedPost = {
                    ...postsObj[postId],
                    ...data
                };
                postsObj[postId] = updatedPost;
                await this.writefile(postsObj);
                return updatedPost;
            }
        } catch (error) {
            return error;
        }
    }
    async deleteAPostById(postId) {
        try {
            const postsObj = await this.readFile();
            if (postsObj.hasOwnProperty(postId)) {
                delete postsObj[postId];
                await this.writefile(postsObj);
                return "A Post was deleted";
            }
        } catch (error) {
            return error;
        }
    }
}

export const postService = new PostService();
