import User from "../models/User.js";

export const findUser = (email) => User.findOne({ email });
export const createUser = (data) => User.create(data);