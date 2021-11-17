import {Request} from "express"
import codes from "http-status-codes"

export interface IregisterRequest extends Request {
    body:IuserObj
}
export interface IuserObj {
    username: string;
    name: string;
    phoneNo?: string;
    password?: string;
    isAnonym: boolean;
}
export interface IloginObj extends Request {
    body: {
        username: string;
        password: string;
    }
}
export interface IchatObj {
    to: string;
    from: string;
    datetime: string;
    msg: string;
}
export interface IerrorObj<T>{
    code?: Number;
    name?: string;
    message?: string;
    details?: T|{}
}
export class ResponseError<T = undefined> implements IerrorObj<T>{
    code: Number;
    name: string;
    message: string;
    details: T|{}
    constructor({code, name, message, details}:IerrorObj<T>){

        this.code = code|| codes.BAD_REQUEST;
        this.name = name || "INVALID_DATA";
        this.message = message || "";
        this.details = details || {};
    }
}