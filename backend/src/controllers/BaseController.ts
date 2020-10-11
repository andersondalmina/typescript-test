import * as express from 'express';

abstract class BaseController {
  protected abstract run(
    req: express.Request,
    res: express.Response
  ): Promise<void | any>;

  public async execute(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      return await this.run(req, res);
    } catch (err) {
      console.log(`Error on executing controller: ${err}\n`);
      this.fail(res, Error('An unexpected error occurred'));
    }
  }

  public success(res: express.Response, data?: any) {
    if (data) {
      res.type('application/json');
      return res.status(200).json(data);
    } else {
      return res.sendStatus(204);
    }
  }

  public fail(res: express.Response, error: Error, status?: number) {
    return res.status(status ?? 500).json({
      message: error.toString(),
    });
  }
}

export default BaseController;
