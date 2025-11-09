let express = require("express");
let cors = require("cors");
const cookieParser = require("cookie-parser");
const { JSDOM } = require("jsdom");
require('dotenv').config()
const path = require("path");
let app = express();
app.use(cors({
    origin: "https://qurate-frontend.vercel.app",  // your React app URL
    credentials: true                // allow cookies
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'Public')));




const { MongoClient, ServerApiVersion } = require('mongodb');
const { get } = require("express/lib/response");
const { issueTokens, requireAuth, refreshSession, otpVerific } = require("./Security");
const { registerUser, login, addVisit } = require("./db");
const { sendMail } = require("./email");
const uri = "mongodb+srv://pshychicexcusealpha_db_user:wl1NBOBNGFtUd3Ce@cluster0.bxw9ggf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let elementsData = [


]

async function main() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select database and collection
        const db = client.db("websiteBuilder");
        const collection = db.collection("addercomponents");

        // Fetch all components
        const components = await collection.find({}).toArray();
        // console.log("All components:", components);
        // elementsData = [...components];
        console.log("passed in the db connection")

        // Insert a new component (example)
        // await collection.insertOne({
        //     id: "component_0007",
        //     name: "New Component",
        //     css: "...",
        //     htmlMap: { ... }
        // });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// main();














// const uri = "mongodb+srv://pshychicexcusealpha_db_user:<db_password>@cluster0.bxw9ggf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return { status: true };
    }
    catch (e) {
        return { status: false, error: e };
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// run().catch(console.dir);

app.get("/testconn", (req, res) => {
    run().then(val => {
        res.send(val.status ? "<h1>Test Cleared</h1>" : ("<h1>There is an error</h1>" + val.error))
    }).catch((err) => {

        run().then(() => {

            run().then(() => {

                res.send("rerun")

            })

        }).catch((err) => {

            res.send([]);

        })
    })
})


















async function getAdderOptionsByCategory(category) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("addercomponents");

    const data = await collection.find({ category: category }).toArray();

    return data;




}

async function getAdderOptionById(id) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("addercomponents");

    const data = await collection.find({ id: id }).toArray();

    return data;

}

async function getTemplateComponentyById(id) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("componentTemplates");

    const data = await collection.find({ id: id }).toArray();

    return data;

}

async function getComponentTemplatesByCategory(category) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("componentTemplates");

    const data = await collection.find({ category: category }).toArray();

    return data;

}

async function getSitesByUserId(userId) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("sites");

    const data = await collection.find({ userId: userId }).toArray();

    console.log(data)

    return data;

}


async function getSiteByPageId(pageId) {
    await client.connect();
    console.log("connected to mongodb");


    const db = client.db("websiteBuilder");
    const collection = db.collection("sites");

    const data = await collection.find({ pageId: pageId }).toArray();

    console.log(data)

    return data;
}




async function addServerData(serverData) {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("websiteBuilder");
        const collection = db.collection("addercomponents");

        // Insert the serverData along with the category
        const result = await collection.insertOne(serverData);
        console.log("Data inserted with id:", result.insertedId);

        return result;
    } catch (error) {
        console.log("Error inserting data into database");
        console.log(error);
        return JSON.stringify(error);
    } finally {
        await client.close(); // close connection if you don't need it open
    }
}
async function addServerDataComponent(serverData) {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select database and collection
        const db = client.db("websiteBuilder");
        const collection = db.collection("componentTemplates");

        // Insert the serverData along with the category
        const result = await collection.insertOne(serverData);
        console.log("Data inserted with id:", result.insertedId);

        return result;

    } catch (err) {
        console.log("Error inserting data into database");
        console.log(err);
        return JSON.stringify(err);
    } finally {
        await client.close();
    }
}
async function addNewPage(serverData) {
    console.log("adding new page")
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select database and collection
        const db = client.db("websiteBuilder");
        const collection = db.collection("sites");

        // Insert the serverData along with the category
        const result = await collection.insertOne(serverData);
        console.log("Data inserted with id:", result.insertedId);

        return result;

    } catch (err) {
        console.log("Error inserting data into database");
        console.log(err);
        return JSON.stringify(err);
    } finally {
        await client.close();
    }
}



// addServerDataComponent({ "id": "Rohit_175983852937010", "name": "Simple Service Section", "img": "https://i.ibb.co/cKCcnS0c/6e1ba1118a84.png", "style": "{}", "initialStyle": [], "htmlMap": [], "category": "servicessection" })















// Sample elements data
const elements = {
    intro: [
        elementsData.find((data) => {
            return data.id === 'component_0002';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0003';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0004';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0005';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0006';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0007';
        }),
        elementsData.find((data) => {
            return data.id === 'component_0008';
        }),
    ],
    image: [
        { id: 'image1', name: 'Full Width Image', image: 'https://via.placeholder.com/150x100?text=Full+Image' },
        { id: 'image2', name: 'Gallery Grid', image: 'https://via.placeholder.com/150x100?text=Gallery' },
    ],
    textbox: [
        { id: 'text1', name: 'Simple Text Box', image: 'https://via.placeholder.com/150x100?text=Text+Box' },
        { id: 'text2', name: 'Quote Box', image: 'https://via.placeholder.com/150x100?text=Quote' },
    ],
    paragraph: [
        elementsData.find((data) => {
            return data.id === 'component_0001';
        })

    ]
};













// for templae components
app.get("/getComponentTemplates", refreshSession, requireAuth, (req, res) => {
    let category = req.query.category;
    getComponentTemplatesByCategory(category).then((data) => {
        console.log("pass in first try")
        res.send(data);
        // console.log(data)
    }).catch((err) => {

        console.log(err);

        run().then(() => {

            getComponentTemplatesByCategory(category).then((data) => {

                console.log("pass in second try")
                res.send(data)

            })

        }).catch((err) => {

            res.send([]);

        })
    })
})

app.get("/getcomponent", refreshSession, requireAuth, (req, res) => {
    // console.log(req.query);
    // let data = tempCompData.find((data) => {
    //     return data.id === req.query.id;
    // })
    // res.send(data)
    getTemplateComponentyById(req.query.id).then(val => {
        res.send(val[0]);
    }).catch((err) => {

        run().then((val) => {

            if (val.status == false) {
                res.send("<h1>Failed rerendering</h1>")
            }
            else {
                getTemplateComponentyById(req.query.id).then((data) => {

                    res.send(data)

                })
            }



        }).catch((err) => {

            res.send([]);

        })
    })
})






// for elememnts
app.get("/getelementadderoptions", refreshSession, requireAuth, (req, res) => {

    console.log(req.query);
    let option = req.query.category.toLocaleLowerCase();
    console.log(option);

    getAdderOptionsByCategory(option).then(val => {
        console.log(val);
        res.send(val);
    }).catch((err) => {

        run().then(() => {

            getAdderOptionsByCategory(option).then((data) => {

                res.send(data)

            })

        }).catch((err) => {

            res.send([]);

        })
    })
})


app.get("/getelementadderbyid", refreshSession, requireAuth, (req, res) => {

    console.log(req.query);
    getAdderOptionById(req.query.id).then((data) => {
        res.send(data[0]);
    }).catch((err) => {

        run().then(() => {

            getAdderOptionById(req.query.id).then((data) => {

                res.send(data)

            })

        }).catch((err) => {

            res.send([]);

        })
    })

})








function htmlToJson(htmlString, componentId = "component_0001", name = "default_component", rootName, category, url) {
    const dom = new JSDOM(htmlString, { contentType: "text/html" });
    const doc = dom.window.document;

    let unknownId = 0;

    // Extract CSS inside <style> (minified into a single line)
    let cssContent = "";
    doc.querySelectorAll("style").forEach(style => {
        cssContent += style.textContent.replace(/\s+/g, " ").trim() + " ";
    });

    // Recursive function to convert DOM -> JSON
    function elementToJson(el) {
        if (el.nodeType !== 1) return null; // Only process elements

        const obj = {
            tag: el.tagName.toLowerCase(),
            id: el.id || ("unknown_id_" + (unknownId++)),
            classNames: el.className ? "production_container " + el.className : "production_container",
            innerText:
                el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
                    ? el.textContent.trim() // ✅ gives real character (✨) not escaped
                    : "",
            children: []
        };

        el.childNodes.forEach(child => {
            if (child.nodeType === 1) {
                const childObj = elementToJson(child);
                if (childObj) obj.children.push(childObj);
            }
        });

        return obj;
    }

    // Find the root container (first .glass-panel)
    const rootEl = doc.querySelector("." + rootName);

    const jsonOutput = {
        id: componentId,
        name: name,
        image: url,
        css: `{ ${cssContent} }`,
        htmlMap: elementToJson(rootEl),
        category: category
    };

    return jsonOutput;
}



function htmlToJson2(htmlString, componentId = "component_0001", name = "default_component", rootName, category = "websites", url = "https://thumbs.dreamstime.com/b/demo-text-businessman-dark-vintage-background-108609906.jpg") {
    const dom = new JSDOM(htmlString, { contentType: "text/html" });
    const doc = dom.window.document;

    let unknownId = 0;

    // Extract CSS inside <style> (minified into a single line)
    let cssContent = "";
    doc.querySelectorAll("style").forEach(style => {
        cssContent += style.textContent.replace(/\s+/g, " ").trim() + " ";
    });

    // Recursive function to convert DOM -> JSON
    function elementToJson(el) {
        if (el.nodeType !== 1) return null; // Only process elements

        const obj = {
            tag: el.tagName.toLowerCase(),
            id: el.id || ("unknown_id_" + (unknownId++)),
            classNames: el.className ? "production_container " + el.className : "production_container",
            innerText:
                el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
                    ? el.textContent.trim() // ✅ gives real character (✨) not escaped
                    : "",
            children: [],
        };

        if (el.tagName.toLowerCase() === "img") {
            obj.src = el.src;
        }

        el.childNodes.forEach(child => {
            if (child.nodeType === 1) {
                const childObj = elementToJson(child);
                if (childObj) obj.children.push(childObj);
            }
        });

        return obj;
    }

    // Find the root container (first .glass-panel)
    // const rootEl = doc.querySelector("." + rootName);
    const rootEl = doc.documentElement;
    console.log(doc.documentElement)

    const jsonOutput = {
        id: componentId,
        name: name,
        img: url,
        style: `{ ${cssContent} }`,
        initialStyle: [],
        htmlMap: [elementToJson(rootEl)],
        category: category
    };

    return jsonOutput;
}




// console.log(JSON.stringify(htmlToJson(htmlInput, "component_00010", "gradient ","neon-intro","intro"), null, 2));

app.get("/addnewvisit",(req,res)=>{
    const siteId = req.query.site;
    addVisit(siteId).then(resp=>{
        res.send(resp)
    }).catch(err=>{
        res.send({status: "error",err: err})
    })
})

app.post("/checkaddingnewcomponent", express.json(), (req, res) => {
    const { html, css, option1, option2, compId, compName, rootName, url } = req.body;
    console.log("Received for check:", { html, css, option1, option2, url });

    if (option1 == "template") {
        let jsonCompData = htmlToJson2(html, compId, compName, rootName, option2, url);
        console.log(jsonCompData)
        res.send(jsonCompData);
        return;
    }

    // Simulate response
    // res.send(`Checked successfully. Option1: ${option1}, Option2: ${option2}`);

    let jsonData = htmlToJson(html, compId, compName, rootName, option2, url);
    res.send(jsonData);
});

app.post("/uploadnewcomponent", express.json(), (req, res) => {

    try {
        const {
            html,
            css,
            option1,
            option2,
            compId,
            compName,
            rootName,
            serverData
        } = req.body;

        if (option1 == "template") {

            addServerDataComponent(serverData).then(result => {

                if (typeof result == String) {
                    res.status(501).send(result);
                    return;
                }

                if (result.acknowledged) {
                    res.status(200).send("Component uploaded successfully!");
                    return;
                }
                else {
                    res.status(500).send("Server error while uploading component." + JSON.stringify(result));
                    return;
                }
            }).catch((err) => {
                res.status(500).send("Server error while uploading component." + JSON.stringify(err));
            })

            return;


        }

    } catch (error) {

    }


    try {
        const {
            html,
            css,
            option1,
            option2,
            compId,
            compName,
            rootName,
            serverData
        } = req.body;

        // Log received data for debugging
        console.log("HTML:", html);
        console.log("CSS:", css);
        console.log("Option1:", option1);
        console.log("Option2:", option2);
        console.log("Component ID:", compId);
        console.log("Component Name:", compName);
        console.log("Root Name:", rootName);
        console.log("Server Data JSON:", serverData);

        // TODO: Save data to DB or file as needed
        // For example:
        // fs.writeFileSync(`components/${compId}.json`, JSON.stringify({html, css, option1, option2, compName, rootName, serverData}, null, 2));

        // res.status(200).send("Component uploaded successfully!");
        addServerData(serverData).then(result => {

            if (typeof result == String) {
                res.status(501).send(result);
            }

            if (result.acknowledged) {
                res.status(200).send("Component uploaded successfully!");
            }
            else {
                res.status(500).send("Server error while uploading component." + JSON.stringify(result));
            }
        }).catch((err) => {
            res.status(500).send("Server error while uploading component." + JSON.stringify(err));
        })
    } catch (err) {
        console.error("Error handling upload:", err);
        res.status(500).send("Server error while uploading component.");
    }
});



app.post("/createnewpage", express.text(), (req, res) => {
    console.log("request recieved");
    let data = JSON.parse(req.body);
    addNewPage({
        userId: data.userId,
        htmlCode: data.htmlCode,
        createdOn: Date.now(),
        description: data.description,
        pageId: data.title.replaceAll(" ", "_").toLowerCase(),
        visitors: 0
    }).then((val) => {
        console.log(val)
        res.send("data added successfullyu")
    }).catch(err => {
        console.log(err);
        res.send(JSON.stringify(err));
    })

})

app.get("/sitescollection", refreshSession, requireAuth, (req, res) => {
    console.log(req.query);
    let userId = req.query.userId;

    getSitesByUserId(userId).then((data) => {
        res.send(data);
    }).catch((err) => {

        run().then(() => {
            getSitesByUserId(userId).then((data) => {

                res.send(data)
            })
        }).catch((err) => {
            res.send([]);
        })
    })


})

app.get("/sitebypageid", refreshSession, requireAuth, (req, res) => {
    console.log(req.query);
    let pageId = req.query.pageId;

    getSiteByPageId(pageId).then((data) => {
        res.send(data[0].htmlCode);
    }).catch((err) => {

        run().then(() => {
            getSiteByPageId(pageId).then((data) => {

                res.send(data)
            })
        }).catch((err) => {
            res.send([]);
        })
    })


})




async function getAiSite(prompt) {
    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACES}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    return query({
        "messages": [
            {
                "role": "user",
                "content": `
                You are a website layout generato.
                Generate only valid HTML and CSS output.
                The HTML must be entirely inside a single <body>...</body> tag.
                Place all CSS inside a single <style>...</style> tag after the <body> section.
                Do not include <html>, <head>, <script>, or any external files.
                every image should be contained inside a seperate div 
                Do not include JavaScript.
                Output format must be exactly: <body><!-- your HTML elements here --></body><style>/* your CSS here */</style> 
                
                Now create the layout for: ${prompt}`
            }
        ],
        "model": "openai/gpt-oss-120b:groq"
    })
}

// getAiSite(" college club at MIT ADT University called Codeshef with proper img urls whereever required make it asthetic and give proper color theme ").
//         then((resp) => {
//             htmlString = (resp['choices'][0]['message']['content']);
//             console.log(htmlString)
//             console.log(htmlToJson2(htmlString));
//         }).catch(err => {
//             console.log(JSON.stringify(err))
//         })


app.get("/testai", refreshSession, requireAuth, (req, res) => {
    getAiSite(" college club at MIT ADT University called Codeshef with proper img urls whereever required make it asthetic and give proper color theme ").
        then((resp) => {
            htmlString = (resp['choices'][0]['message']['content']);
            res.send(htmlToJson2(htmlString));
        }).catch(err => {
            res.send(JSON.stringify(err))
        })
})


app.post("/genaipage", express.json(), (req, res) => {

    let prompt = req.body.prompt;
    console.log(prompt);
    // return;
    getAiSite(prompt).
        then((resp) => {
            htmlString = (resp['choices'][0]['message']['content']);
            res.send(htmlToJson2(htmlString));
        }).catch(err => {
            res.send(JSON.stringify(err))
        })
})

app.get("/editor", refreshSession, requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "editor.html"));
});


app.post("/login", (req, res) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        console.log("RAW BODY:", body); // string

        // If it is JSON, convert:
        try {
            const json = JSON.parse(body);

            const user = {
                email: json.email
            }

            login(json.email, json.password).then((resp) => {


                if (resp.status == "success") {
                    issueTokens(res, user);
                }

                res.send(JSON.stringify(resp));


            })



            console.log("PARSED JSON:", json);
        } catch (e) {
            console.log(e);
            console.log("Body is not JSON");
        }


    });
});


app.post("/register", (req, res) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        console.log("RAW BODY:", body); // string

        // If it is JSON, convert:
        try {
            const json = JSON.parse(body);

            registerUser(json.firstName, json.lastName, json.email, json.password).then(resp => {
                console.log(resp);
                if (resp.status == "success") {

                    const user = {
                        email: json.email
                    }

                    issueTokens(res, user)
                    res.send(JSON.stringify({ status: "success", message: "Email verified successfully", user: { email: json.email } }));
                    return;
                }
                else {
                    res.send({
                        status: "unknown error",
                        user: "admin",
                    });
                }
            })

            console.log("PARSED JSON:", json);
        } catch (e) {
            console.log(e);
            console.log("Body is not JSON");
            res.send({
                status: "error",
                user: "admin",
                error: e
            });
        }




    });
});

app.post("/otpverific", (req, res) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        console.log("RAW BODY:", body); // string

        // If it is JSON, convert:
        try {
            const json = JSON.parse(body);

            otpVerific(json.email, json.otp).then(resp => {
                res.send(JSON.stringify(resp));
            })


            console.log("PARSED JSON:", json);
        } catch (e) {
            console.log(e);
            console.log("Body is not JSON");
            res.send({
                status: "error",
                user: "admin",
                error: e
            });
        }




    });
});



app.get("/logout", (req, res) => {
    const cookies = req.cookies;
    for (let cookieName in cookies) {
        res.clearCookie(cookieName);
    }
    res.send(JSON.stringify({ status: "success" }));
})






// sendMail("pshychicexcusealpha@gmail.com", "Hello", "This is a test email.");


let port = process.env.port || 9600;
app.listen(port, () => {
    console.log(port)
    console.log("launched on localhost 9600");
})