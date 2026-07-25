import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows Node.js DNS SRV lookup (querySrv ECONNREFUSED / ETIMEOUT)
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failure Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

