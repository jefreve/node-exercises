import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      if (!user || err) {
        res.status(401).json({ msg: "Unauthorized." });
      } else {
        req.user = user;
        console.log(user);
        next();
      }
    }
  )(req, req, next);
};

export default authorize;
