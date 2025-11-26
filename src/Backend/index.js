const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1yqh2qi.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("next-store");
    const productsCollection = db.collection("products");

    // recent add product API
    app.get("/recent-products", async (req, res) => {
      const cursor = productsCollection
        .find()
        .sort({
          createAt: -1,
        })
        .limit(4);
      const result = await cursor.toArray();
      res.send(result);
    });

    // // My product API
    app.get("/my-Products", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }

      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // get all product API
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  Get product Details by id
    app.get("/products/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const cursor = await productsCollection.findOne(query);
      res.send(cursor);
    });

    // product add API
    app.post("/products", async (req, res) => {
      const event = req.body;
      event.createAt = new Date();
      const result = await productsCollection.insertOne(event);
      res.send(result);
    });

    //Delete My Product
    app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;
      const result = await productsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Next Store product Management server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
