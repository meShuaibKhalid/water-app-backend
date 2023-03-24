import { SchemaOptions } from "mongoose";

export const schemaOptions: SchemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};