import mongoose, {Document,Schema,model,Types} from 'mongoose'

export interface IGameScore extends Document{
    _id: string;
    userId: Types.ObjectId;
    score: number;
    gameType: string;
    submittedAt: Date;
    // metadata?:{
    //     level: number,
    //     timeStamp: Date;
    // }
}

const gameScoreSchema: Schema<IGameScore> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user ID is required"],
        index: true
    },
    score: {
        type: Number,
        required: [true, "Score is required"],
        min: [0, 'Score cannot be negative']
    },
    gameType: {
        type: String,
        required: [true, "Game type is required"],
        enum: ['classic','arcade','time-trial','survival'],
        index: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
})

const Games = model("Game",gameScoreSchema)

export default Games;
