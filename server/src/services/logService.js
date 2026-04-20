import * as repo from "../repositories/logRepository.js";

export const addLog = (data) => repo.createLog(data);
export const fetchLogs = () => repo.getLogs();
export const removeLog = (id) => repo.deleteLog(id);