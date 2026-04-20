import Log from "../models/Log.js";

export const createLog = async (data) => {
  return await Log.create(data);
};

export const getLogs = async () => {
  return await Log.find().sort({ createdAt: -1 });
};

export const deleteLog = async (id) => {
  return await Log.findByIdAndDelete(id);
};