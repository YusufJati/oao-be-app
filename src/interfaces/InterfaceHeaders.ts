import { Request } from "express";
import { IncomingHttpHeaders } from "http";

export interface HeaderAuth extends Request {
    headers: IncomingHttpHeaders & {
        AuthHeader: string;
    }
}