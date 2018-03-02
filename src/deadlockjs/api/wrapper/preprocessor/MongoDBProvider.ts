import {Preprocessor} from "./Preprocessor";
import {APIDescription, APIEndPoint} from "../../../../index";
import * as express from "express";
import {MongoClient} from "mongodb";


export class MongoDBProvider implements Preprocessor {


    private readonly activated: boolean = false;

    private readonly url: string;

    constructor(api: APIDescription) {
        if (api.db) {
            if (api.db.mongodb) {
                this.activated = true;
                this.url = api.db.mongodb.url;
            }
        }
    }

    public async preprocess (endPoint: APIEndPoint, req: express.Request, res: express.Response): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.activated && endPoint.dbConnection) {
                MongoClient.connect(this.url, (err: any, client: MongoClient) => {
                    if (err) return reject(err);
                    else {
                        res.locals.dl.mongodb = client;
                        resolve();
                    }
                });
            } else {
                return resolve();
            }
        })
    }

}