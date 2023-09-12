const http = require("http");
const { v4: uuid, validate } = require("uuid");
const fs = require("fs");

const port = 4002;
const host = "localhost";

const handleErrors = (res, message = "Something went wrong from our side") => {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(message);
};

const newId = uuid();

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPathMatch = (path, pattern) => {
    const parts = path.split("/");
    // Implement your logic

    return (
        parts.length === pattern &&
        parts[1] === "applications" &&
        validate(parts[2])
    );
};

const getAllApplications = (res) => {
    // Code to return all job applications

    fs.readFile("job-applications.json", "utf-8", (err, data) => {
        if (err) {
            handleErrors(res);
        }

        const parsedData = JSON.parse(data);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(parsedData));
    });
};

const createApplication = (req, res) => {
    // Code to create a new job application

    fs.readFile("job-applications.json", "utf-8", (err, data) => {
        if (err) {
            handleErrors(res);
        }

        const parsedApplicationData = JSON.parse(data);

        let body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            body = JSON.parse(Buffer.concat(body));
            const newJobApplication = {
                id: newId,
                companyName: body.companyName,
                recruiterName: body.recruiterName,
                position: body.position,
                appliedDate: body.appliedDate,
                status: body.status
            };
            parsedApplicationData[newId] = newJobApplication;

            fs.writeFile(
                "job-applications.json",
                JSON.stringify(parsedApplicationData),
                (err) => {
                    if (err) {
                        handleErrors(res);
                    }
                    res.writeHead(201, { "content-type": "application/json" });
                    res.end(JSON.stringify(newJobApplication));
                }
            );
        });
    });
};

const getApplication = (req, res) => {
    // Code to get a single job application

    fs.readFile("job-applications.json", "utf-8", (err, data) => {
        if (err) {
            handleErrors(res);
        }

        const parsedApplicationData = JSON.parse(data);

        const id = parseId(req.url, 2);
        const application = parsedApplicationData[id];

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(application));
    });
};

const updateApplicationStatus = (req, res) => {
    fs.readFile("job-applications.json", "utf-8", (err, data) => {
        if (err) {
            handleErrors(res);
        }

        const parsedApplicationData = JSON.parse(data);

        let body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            body = JSON.parse(Buffer.concat(body));
            const id = parseId(req.url, 2);

            parsedApplicationData[id].status = body.status;

            fs.writeFile(
                "job-applications.json",
                JSON.stringify(parsedApplicationData),
                (err) => {
                    if (err) {
                        handleErrors(res);
                    }

                    res.statusCode = 204;
                    res.end();
                }
            );
        });
    });
};

const deleteApplication = (req, res) => {
    // Code to delete a job application

    fs.readFile("job-applications.json", "utf-8", (err, data) => {
        if (err) {
            handleErrors(res);
        }

        const parsedApplicationData = JSON.parse(data);

        const id = parseId(req.url, 2);
        delete parsedApplicationData[id];
        res.statusCode = 200;
        res.end();
    });
};

const server = http.createServer((req, res) => {
    const isPathMatch = verifyPathMatch(req.url, 3); // assuming verifyPathMatch function is defined

    // Retrieve all job applications
    if (req.url === "/applications" && req.method === "GET") {
        getAllApplications(res); // assuming getAllApplications function is defined
    }
    // Create a new job application
    else if (req.url === "/applications" && req.method === "POST") {
        createApplication(req, res); // assuming createApplication function is defined
    }
    // Update a specific job application's status
    else if (isPathMatch && req.method === "PATCH") {
        updateApplicationStatus(req, res); // assuming updateApplicationStatus function is defined
    }
    // Retrieve a specific job application
    else if (isPathMatch && req.method === "GET") {
        getApplication(req, res); // assuming getApplication function is defined
    }
    // Delete a specific job application
    else if (isPathMatch && req.method === "DELETE") {
        deleteApplication(req, res); // assuming deleteApplication function is defined
    }
    // If the endpoint is not matched
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
