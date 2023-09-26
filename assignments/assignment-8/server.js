import express from "express";
import { postRouter } from "./routes/post.routes.js";
import { authorRouter } from "./routes/author.routes.js";
import { tagRouter } from "./routes/tag.routes.js";

const app = express();
app.use(express.json());

const PORT = 6040;

app.use("/posts", postRouter);
app.use("/authors", authorRouter);
app.use("/tags", tagRouter);

app.listen(PORT, () => {
    console.log("Process is running on ", PORT);
});
