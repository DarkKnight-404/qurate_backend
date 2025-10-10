let express = require("express");
let cors = require("cors");
const { JSDOM } = require("jsdom");
require('dotenv').config()
const path = require("path");
let app = express();
app.use(cors());


app.use(express.static(path.join(__dirname, 'Public')));




const { MongoClient, ServerApiVersion } = require('mongodb');
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
app.get("/getComponentTemplates", (req, res) => {
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

app.get("/getcomponent", (req, res) => {
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
app.get("/getelementadderoptions", (req, res) => {

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


app.get("/getelementadderbyid", (req, res) => {

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



function htmlToJson2(htmlString, componentId = "component_0001", name = "default_component", rootName, category, url) {
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



app.post("/createnewpage", express.json(), (req, res) => {
    try {
        const {
            htmlCode,
            userId
        } = req.body;


        addNewPage(htmlCode).then(result => {

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



    } catch (error) {

    }
})




app.get("/editor", (req, res) => {
    res.sendFile(path.join(__dirname, "editor.html"));
});



let port = process.env.port || 9600;
app.listen(port, () => {
    console.log(port)
    console.log("launched on localhost 9600");
})