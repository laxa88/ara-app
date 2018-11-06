import Express from "express";

const handleException = (e: any, res: Express.Response) => {
  res.status(500).json({ message: e.toString() });
};

export { handleException };
