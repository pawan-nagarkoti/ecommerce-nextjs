import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl: any = process.env.MONGODB_URL;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog database connection is successfull"))
    .catch((error) => console.log("error while connection mongo", error));
};

export default connectToDB;
