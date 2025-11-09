const { MongoClient, ServerApiVersion } = require("mongodb");
const { sendOneTimePass } = require("./email");

const uri = "mongodb+srv://pshychicexcusealpha_db_user:wl1NBOBNGFtUd3Ce@cluster0.bxw9ggf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




async function registerUser(firstName, lastName, email, password) {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("websiteBuilder");
        const collection = db.collection("user");


        let oneTimePass = parseInt(Math.random() * 10000);

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            verified: false,
            oneTimePass: oneTimePass
        };

        const result = await collection.insertOne(newUser);
        console.log("User inserted with _id:", result.insertedId);

        // IMPORTANT: await this
        await sendOneTimePass(email, oneTimePass);

        console.log("Email sent");

        return { status: "success", userId: result.insertedId };



    } catch (err) {
        console.error(err);
        return { status: "error", message: err.message };
    } finally {
        await client.close();
    }
}




async function verifyOneTimePass(email, enteredOtp) {
    try {
        await client.connect();
        const db = client.db("websiteBuilder");
        const collection = db.collection("user");

        // Find user record
        const user = await collection.findOne({ email });

        if (!user) return { status: "error", message: "User not found" };
        if (user.verified === true) return { status: "ok", message: "Already verified" };

        console.log(user.oneTimePass)
        console.log(enteredOtp)

        // Check OTP match
        if (parseInt(user.oneTimePass) != parseInt(enteredOtp)) {
            return { status: "error", message: "Invalid OTP" };
        }

        // Update user to verified and remove OTP
        await collection.updateOne(
            { email },
            { $set: { verified: true }, $unset: { oneTimePass: "" } }
        );

        return { status: "success", message: "Email verified successfully", user: { email: email } };

    } catch (err) {
        return { status: "error", message: err.message };
    } finally {
        await client.close();
    }
}



async function login(email, pass) {
    try {
        await client.connect();
        const db = client.db("websiteBuilder");
        const collection = db.collection("user");

        // Find user record
        const user = await collection.findOne({ email });

        if (!user) return { status: "error", message: "User not found" };


        // Check OTP match
        console.log(user.password)
        console.log(pass)
        if (user.password == pass) {
            return { status: "success", message: "Email verified successfully", user: { email: email } };
        }
        else{
            return { status: "fail", message: "wrong password, please try again", user: { email: email } };
        }
        






    } catch (err) {
        return { status: "error", message: err.message };
    } finally {
        await client.close();
    }
}



async function addVisit(siteId) {
    try {
        await client.connect();
        const db = client.db("websiteBuilder");
        const collection = db.collection("site");

        // Find user record
        const site = await collection.findOne({ pageId: siteId });

        
        await collection.updateOne(
            { pageId: siteId },
            { $inc: { visitors: 1 } }
        );


        return {status: "success"};



    } catch (err) {
        return { status: "error", message: err.message };
    } finally {
        await client.close();
    }
}



module.exports = {
    registerUser,
    verifyOneTimePass,
    login,
    addVisit
}
