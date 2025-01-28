import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { connection } from 'mongoose';
import { logger } from '@utils/logger';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public checkHealth = async (req: Request, res: Response, next: NextFunction) => {
    let mongoHealth = null;
    let errorMessage = '';
    try {
      try {
        mongoHealth = this.checkHealthMongoDb();
      } catch (error) {
        errorMessage = error.message;
        logger.error(`Error Health api: MongoError. Message: ${error}`);
      }

      if (mongoHealth != null) {
        res.json({
          status: StatusCodes.OK,
          mongo: mongoHealth,
        });
      } else {
        logger.error(`Error in Health api: MongoError`);
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          status: StatusCodes.SERVICE_UNAVAILABLE,
          message: errorMessage,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  private readonly checkHealthMongoDb = () => {
    let dbConnectionState = true;

    if (!connection || connection.readyState !== 1) {
      dbConnectionState = false;
    }

    // if all connections are fine
    if (dbConnectionState) {
      return 'Mongo Connected';
    } else {
      return null;
    }
  };
}

export default IndexController;
