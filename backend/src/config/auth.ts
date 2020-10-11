import express from "express";

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).send();
  }

  return next();
}
