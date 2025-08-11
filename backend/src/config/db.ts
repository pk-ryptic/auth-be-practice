import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch(error) {
        console.log(`Error on connecting database: ${error}`);
        process.exit(1);
    }
}
export default connectToDatabase;