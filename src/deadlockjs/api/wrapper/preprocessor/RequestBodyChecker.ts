import {IPreprocessor} from "./IPreprocessor";
import {APIEndPoint} from "../../../../";
import * as express from "express";

export class RequestBodyChecker implements IPreprocessor {
    public preprocess (endPoint: APIEndPoint, req: express.Request, res: express.Response): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (endPoint.paramFilter) {
                const filtered: any = endPoint.paramFilter.mask(req.body);
                if (typeof filtered !== 'undefined') {
                    res.locals.params = filtered;
                    resolve();
                } else {
                    reject(new Error("Error parsing parameters. Some are missing or invalid!"));
                }
            } else {
                resolve();
            }
        });
    }
}