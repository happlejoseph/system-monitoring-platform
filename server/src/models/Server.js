

const serverSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    hostname: {
        type: String,
        required: true,
        trim: true
    },

    ipAddress: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ["simulated", "live"],
        default: "simulated"
    },

    processName: {
        type: String,
        trim: true
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {timestamps: true});

const Server = mongoose.model('Server', serverSchema);

export default Server;